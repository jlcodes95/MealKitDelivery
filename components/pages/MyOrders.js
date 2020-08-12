import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import OrderItem from '../subcomponents/OrderItem'

import firebase from '../../Firebase'
const db = firebase.firestore()

export default function MyOrders({ navigation }) {

  const [list, setList] = useState([])

  const fetchMyOrders = async () => {
    db.collection('orders')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        let orders = []
        snapshot.forEach((doc) => {
          orders.push(doc.data())
        })
        console.log(orders)
        setList(orders)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])

  const onOrderItemPress = (order) => {
    console.log('falagaga')
    navigation.navigate('OrderSummary', { order: order })
  }

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <OrderItem
          oid={item.oid}
          name={item.name}
          date={item.date}
          total={item.total}
          status={item.status}
          clickHandler={() => onOrderItemPress(item)}
        />
      )}
      keyExtractor={item => item.id}
    />
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
