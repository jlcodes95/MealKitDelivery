import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function AccountItem({ title, clickHandler }) {

  return (
    <TouchableOpacity style={styles.container} onPress={clickHandler}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderWidth: 0.2
  },
  title: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 18
  }
});
