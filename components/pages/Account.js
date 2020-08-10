import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import AccountItem from '../subcomponents/AccountItem'

export default function Account({ navigation }) {

  return (
    <View style={styles.container}>
      <AccountItem title='Profile' clickHandler={() => {console.log('Profile')}} />
      <AccountItem title='Payment Methods' clickHandler={() => {alert('Coming Soon')}} />
      <AccountItem title='Raffle' clickHandler={() => {alert('Coming Soon')}} />
      <AccountItem title='Frequently Asked Questions' clickHandler={() => {console.log('FAQ')}} />
      <AccountItem title='Log Out' clickHandler={() => {navigation.replace('SignIn')}} />
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
