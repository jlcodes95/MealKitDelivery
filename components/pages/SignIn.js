import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import firebase from '../../Firebase'

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (firebase.auth().currentUser != null) {
      console.log(firebase.auth().currentUser)
      navigation.replace('Dashboard')
    }
  },[])

  const onSignInPressed = () => {
    if (email === '' || password === '') {
      alert('Please enter the fields correctly')
      return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response)
      navigation.replace('Dashboard')
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.')
      } else {
        alert(errorMessage);
      }
      console.log(error)
    })
  }

  const onSignInPhone = () => {
    navigation.push('PhoneSignIn')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Meal Kit Delivery</Text>
      <Text style={styles.h2}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        textContentType='emailAddress'
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        textContentType='password'
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={onSignInPressed}>
        <Text style={{color: '#fff'}}>Sign In</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text style={{textDecorationLine: 'underline', color: '#e91e63'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text>or</Text>
      <View>
        <TouchableOpacity style={[styles.buttonStretch, {backgroundColor: '#eee'}]} onPress={onSignInPhone}>
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStretch, {backgroundColor: 'purple'}]} onPress={onSignInPhone}>
          <Text>Sign in with Yahoo</Text>
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
  buttonStretch: {
    width: 250,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10
  }
})
