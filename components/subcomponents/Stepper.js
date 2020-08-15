import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'

export const Stepper = ({ value, onValueChangeHandler }) => {
  const [disableDecrement, setDisableDecrement] = useState(true)
  const [disableIncrement, setDisableIncrement] = useState(false)

  const increment = () => {
    let newValue = parseInt(value)
    onValueChangeHandler(`${newValue + 1}`)
  }

  const decrement = () => {
    let newValue = parseInt(value)
    onValueChangeHandler(`${newValue - 1}`)
  }

  useEffect(() => {
    const currentValue  = parseInt(value)
    if (currentValue === 1) {
      setDisableDecrement(true)
      setDisableIncrement(false)
    }else if (currentValue === 5){
      setDisableIncrement(true)
      setDisableDecrement(false)
    }else {
      setDisableDecrement(false)
      setDisableIncrement(false)
    }
  }, [value])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {backgroundColor: !disableDecrement ? '#e91e63' : '#d2698d'}]} onPress={decrement} disabled={disableDecrement}>
        <Text>-</Text>
      </TouchableOpacity>
      <TextInput
        editable={false}
        style={styles.input}
        value={value}
        onChangeText={text => onValueChangeHandler(text)}
      />
      <TouchableOpacity style={[styles.button, {backgroundColor: !disableIncrement ? '#e91e63' : '#d2698d'}]} onPress={increment} disabled={disableIncrement}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 5,
    height: 30,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  }
})
