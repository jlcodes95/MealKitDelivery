import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { Regex } from '../subcomponents/Regex'
import firebase from '../../Firebase'

export default function PhoneSignIn({ navigation }) {
  const recaptchaVerifier = useRef(null)
  const [phone, setPhone] = useState({value: '', hasChanged: false, valid: true})
  const [verificationId, setVerificationId] = useState('')
  const [code, setCode] = useState('')
  const [sendCodeDisabled, setSendCodeDisabled] = useState(true)
  const [signInDisabled, setSignInDisabled] = useState(true)

  useEffect(() => setSendCodeDisabled(!phone.hasChanged || !phone.valid), [phone])
  useEffect(() => setSignInDisabled(code.length < 6), [code])

  const onSendVerificationCodePress = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider()
    phoneProvider.verifyPhoneNumber(`+1${phone.value}`, recaptchaVerifier.current)
      .then((value) => {
        console.log(value)
        setVerificationId(value)
        setSendCodeDisabled(true)
      }).catch(err => console.log(err))
  }

  const onSignInPress = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
    firebase.auth().signInWithCredential(credential).then((response) => {
        console.log(response)
        if (response.additionalUserInfo.isNewUser) {
          firebase.firestore().collection('users').doc(`${response.user.uid}`).set({
            phone: phone.value
          }).then(() => navigation.replace('Dashboard')).catch(err => {
            console.log(err)
          })
        }else {
          navigation.replace('Dashboard')
        }
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Meal Kit Delivery</Text>
      <Text style={styles.h2}>Phone Sign In</Text>
        <TextInput
          style={[styles.input, {width: 250}]}
          placeholder='Phone Number'
          textContentType='telephoneNumber'
          onChangeText={text => setPhone({
            value: text,
            hasChanged: true,
            valid: Regex.phone.test(text)
          })}
          value={phone.value}
        />
      {!phone.valid && <Text style={styles.error}>Please enter a NA phone number</Text>}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          style={[styles.input, {width: 135, marginRight: 15}]}
          placeholder='Verification Code'
          onChangeText={text => setCode(text)}
          value={code}
        />
        <TouchableOpacity style={[styles.button, {
            width: 100,
            backgroundColor: sendCodeDisabled ? '#d2698d' : '#e91e63'
          }]} onPress={onSendVerificationCodePress} disabled={sendCodeDisabled}>
          <Text>Send Code</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, {
          width: 250,
          backgroundColor: signInDisabled ? '#d2698d' : '#e91e63'
        }]} onPress={onSignInPress} disabled={signInDisabled}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 50,
    color: '#e91e63',
  },
  h2: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20
  },
  input: {
    height: 40,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 5,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#e91e63',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12
  }
})
