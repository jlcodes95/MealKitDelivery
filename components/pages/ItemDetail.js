import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import { LoadImage } from '../subcomponents/LoadImage'
import { Stepper } from '../subcomponents/Stepper'

export default function ItemDetail({ route, navigation }) {
  const item = route.params.item
  const addItemToCart = route.params.addItemToCart
  const count = route.params.count
  const [url, setUrl] = useState('')
  const [value, setValue] = useState('1')

  const getImage = async () => {
    let image = await LoadImage(item.photo)
    setUrl(image)
  }

  const onAddToCartPressed = () => {
    addItemToCart(item, parseInt(value))
    // navigation.push('OrderConfirmation', {item: item})
    navigation.goBack()
  }

  useEffect(() => {
    getImage()
    if (count > -1) {
      setValue(`${count}`)
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image style={styles.image} source={{uri: url}} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={[styles.desc, {fontStyle: 'italic'}]}>Each meal has an average calorie count of {item.calorie}</Text>
        <Text style={styles.price}>{`$${item.price}`}</Text>
      </View>
      <Stepper value={value} onValueChangeHandler={setValue}/>
      <TouchableOpacity style={styles.button} onPress={onAddToCartPressed}>
        <Text>{count > -1 ? 'Update Cart' : 'Add To Cart'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    resizeMode: 'contain',
    width: 400,
    height: 400,
  },
  name: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#333333',
    fontWeight: '500',
    fontSize: 25
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e91e63',
  },
  desc: {
    color: '#888888',
    fontSize: 12
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    borderRadius: 5
  }
});
