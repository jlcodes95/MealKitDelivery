import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

export default function ProfileRow({ label, value, handler, editable }) {

  return (
    <View style={styles.container} disabled={!editable}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, {color: editable ? '#000' : '#999'}]}
        onChangeText={text => handler(text)}
        value={value}
        editable={editable}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  label: {
    fontSize: 12,
    color: '#999999'
  },
  input: {
    height: 30,
    width: '100%',
    paddingTop: 5,
    fontSize: 18,
    fontWeight: '500',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1
  }
})
