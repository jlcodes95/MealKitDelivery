import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import BrowseItem from '../subcomponents/BrowseItem'
import ItemDetail from './ItemDetail'

import firebase from '../../Firebase'

const OrderStack = createStackNavigator()
const db = firebase.firestore()

export default function Order({ navigation }) {

  const [list, setList] = useState([])

  const fetchMealKits = async () => {
    db.collection('mealkits').get().then(snapshot => {
      let mealkits = []
      snapshot.forEach((doc) => {
        mealkits.push(doc.data())
      })
      setList(mealkits)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMealKits()
  }, [navigation])

  const redirectDetail = (item) => {
    navigation.navigate('Detail', {
      item: item
    })
  }

  const OrderScreen = () => (
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
  )

  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Order" component={OrderScreen}/>
    </OrderStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
