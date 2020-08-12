import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native'
import firebase from '../../Firebase'
import { Regex } from '../subcomponents/Regex'

export default function SignUp({ navigation }) {

  const [email, setEmail] = useState({value: '', hasChanged: false, valid: true})
  const [password, setPassword] = useState({value: '', hasChanged: false, valid: true})
  const [password2, setPassword2] = useState({value: '', hasChanged: false, valid: true})
  const [phone, setPhone] = useState({value: '', hasChanged: false, valid: true})

  const validateEmail = (email) => (email != '' && Regex.email.test(email))
  const validatePassword = (password) => (password != '' && Regex.password.test(password))
  const validatePassword2 = (password2) => (password2 != '' && password.value === password2)
  const validatePhone = (phone) => (phone != '' && Regex.phone.test(phone))

  const validateForm = () => email.hasChanged && email.valid &&
                             password.hasChanged && password.valid &&
                             password2.hasChanged && password2.valid &&
                             phone.hasChanged && phone.valid

  const onSignUpPressed = () => {
    if (!validateForm()) {
      alert('Please enter the fields correctly')
      return
    }

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(response => {
      console.log(response)
      firebase.firestore().collection('users').doc(`${response.user.uid}`).set({
        email: email.value,
        phone: phone.value
      }).then(() => navigation.pop()).catch(err => {
        console.log(err)
      })
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.')
      } else {
        alert(errorMessage)
      }
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Meal Kit Delivery</Text>
      <Text style={styles.h2}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        textContentType='emailAddress'
        onChangeText={text => setEmail({
          value: text,
          hasChanged: true,
          valid: validateEmail(text)
        })}
        value={email.value}
      />
      {!email.valid && <Text style={styles.error}>Email is invalid</Text>}
      <TextInput
        style={styles.input}
        placeholder='Password'
        textContentType='newPassword'
        secureTextEntry
        onChangeText={text => setPassword({
          value: text,
          hasChanged: true,
          valid: validatePassword(text)
        })}
        value={password.value}
      />
      {!password.valid && <Text style={styles.error}>Password must be at least 8 characters long</Text>}
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        textContentType='password'
        secureTextEntry
        onChangeText={text => setPassword2({
          value: text,
          hasChanged: true,
          valid: validatePassword2(text)
        })}
        value={password2.value}
      />
      {!password2.valid && <Text style={styles.error}>Passwords don't match</Text>}
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        textContentType='telephoneNumber'
        onChangeText={text => setPhone({
          value: text,
          hasChanged: true,
          valid: validatePhone(text)
        })}
        value={phone.value}
      />
      {!phone.valid && <Text style={styles.error}>Phone number is invalid</Text>}
      <TouchableOpacity style={styles.button} onPress={onSignUpPressed}>
        <Text style={{color: '#fff'}}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={{textDecorationLine: 'underline', color: '#e91e63'}}>Sign In</Text>
        </TouchableOpacity>
      </View>
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
    width: 250,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#e91e63',
    width: 100,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12
  }
})
