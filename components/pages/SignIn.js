import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Meal Kit Delivery</Text>
      <Text style={styles.h2}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Dashboard')}>
        <Text style={{color: '#fff'}}>Sign In</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text style={{textDecorationLine: 'underline', color: '#e91e63'}}>Sign Up</Text>
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
  }
});
