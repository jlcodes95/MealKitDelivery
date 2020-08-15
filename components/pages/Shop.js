import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'


import { FontAwesome5 } from '@expo/vector-icons'

//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import BrowseItem from '../subcomponents/BrowseItem'
import ItemDetail from './ItemDetail'

import firebase from '../../Firebase'

const ShopStack = createStackNavigator()
const db = firebase.firestore()

export default function Shop({ navigation }) {

  const [list, setList] = useState([])
  const [cart, setCart] = useState([])

  const fetchMealKits = async () => {
    db.collection('mealkits').get().then(snapshot => {
      let mealkits = []
      snapshot.forEach((doc) => {
        mealkits.push(doc.data())
      })
      setList(mealkits)
    }).catch(err => console.log(err))
  }

  const findItemIndexInCart = (sku) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item.sku === sku) {
        return i
      }
    }
    return -1
  }

  const addItemToCart = (item, qty) => {
    let newCart = cart
    const index = findItemIndexInCart(item.sku)
    if (index === -1) {
      newCart.push({item: item, qty: qty})
    }else {
      newCart.splice(index, 1, {item: item, qty: qty})
    }
    setCart(newCart)
  }

  const getQtyInCart = (sku) => {
    const index = findItemIndexInCart(sku)
    if (index > -1) {
      console.log(cart)
      return cart[index].qty
    }
    return -1
  }

  const modifyCart = (newCart) => {
    setCart(newCart)
  }

  const emptyCart = () => {
    setCart([])
  }

  const redirectDetail = (item) => {
    navigation.navigate('Detail', {
      item: item,
      count: getQtyInCart(item.sku),
      addItemToCart: addItemToCart
    })
  }

  const redirectCheckout = () => {
    navigation.navigate('OrderConfirmation', {
      cart: cart,
      modifyCart: modifyCart,
      emptyCart: emptyCart
    })
  }

  useEffect(() => {
    fetchMealKits()
    navigation.addListener('focus', () => {
      console.log(cart.length)
    })
  }, [navigation])

  // useEffect(() => {
  //   console.log(cart.length)
  // }, [])

  const ShopScreen = () => (
    <View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <BrowseItem
            name={item.name}
            desc={item.description}
            price={item.price}
            photo={item.photo}
            clickHandler={() => redirectDetail(item)}
          />
        )}
        keyExtractor={item => item.sku}
      />
      <TouchableOpacity style={styles.cart} onPress={redirectCheckout}>
        <FontAwesome5 name='shopping-basket' size={24} color='black' />
      </TouchableOpacity>
    </View>
  )

  return (
    <ShopStack.Navigator>
      <ShopStack.Screen name="Order" component={ShopScreen}/>
    </ShopStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart: {
   alignItems:'center',
   justifyContent:'center',
   position: 'absolute',
   height: 70,
   width: 70,
   bottom: 20,
   right: 20,
   backgroundColor:'#e91e63',
   borderRadius: 100,
 }
});
