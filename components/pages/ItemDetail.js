import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import { ImageEntry } from '../subcomponents/ImageEntry'

export default function ItemDetail({ route, navigation}) {
  const item = route.params.item

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image style={styles.image} source={ImageEntry[item.name]} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={[styles.desc, {fontStyle: 'italic'}]}>Each meal has an average calorie count of {item.calorie}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('OrderConfirmation', {item: item})}>
        <Text>Purchase</Text>
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
    backgroundColor: '#e91e63'
  }
});
