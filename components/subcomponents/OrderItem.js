import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default function OrderItem({ name, date, total, clickHandler }) {

  return (
    <TouchableOpacity style={styles.container} onPress={clickHandler}>
      <Text style={styles.name}>{name}</Text>
      <Text>{total}</Text>
      <Text>{date}</Text>
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
  name: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 18
  }
});
