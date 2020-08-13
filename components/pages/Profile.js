import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import ProfileRow from '../subcomponents/ProfileRow'
import firebase from '../../Firebase'



export default function Profile({ navigation }) {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Lin')
  const [email, setEmail] = useState('john@gmail.com')
  const [phone, setPhone] = useState('1234567890')

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.image}>
      <Image source={require('../../assets/add.png')} style={{
        tintColor: '#e91e63',
        height: 200,
        width: 200,
        borderRadius: Platform.OS === 'ios' ? 200/2 : 200
        }}
      />
    </TouchableOpacity>
      <View style={{flex: 1, width: '100%'}}>
        <ProfileRow label='First Name' value={firstName} handler={setFirstName} editable={true}/>
        <ProfileRow label='Last Name' value={lastName} handler={setLastName} editable={true}/>
        <ProfileRow label='Email Address' value={email} handler={setEmail} editable={false}/>
        <ProfileRow label='Phone Number' value={phone} handler={setPhone} editable={false}/>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  image: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderRadius: Platform.OS === 'ios' ? 200/2 : 200
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    borderRadius: 5
  }
})
