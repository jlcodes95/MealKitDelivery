import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import firebase from '../../Firebase'

import AccountItem from '../subcomponents/AccountItem'

export default function Account({ navigation }) {

  const onLogOutPressed = () => {
    firebase.auth().signOut().then(response => {
      console.log('logout successful')
      navigation.replace('SignIn')
    }).catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <AccountItem title='Profile' clickHandler={() => navigation.navigate('Profile')} />
      <AccountItem title='Payment Methods' clickHandler={() => {alert('Coming Soon')}} />
      <AccountItem title='Raffle' clickHandler={() => {alert('Coming Soon')}} />
      <AccountItem title='Frequently Asked Questions' clickHandler={() => {alert('Coming Soon')}} />
      <AccountItem title='Log Out' clickHandler={onLogOutPressed} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
