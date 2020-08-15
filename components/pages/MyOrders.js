import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import OrderItem from '../subcomponents/OrderItem'
import dollar from '../subcomponents/dollar'

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
    navigation.addListener('focus', () => {
      fetchMyOrders()
    })
    // fetchMyOrders()
  }, [navigation])


  const onOrderItemPress = (order) => {
    navigation.navigate('OrderSummary', { order: order })
  }

  const onPickupPress = (oid) => {
    db.collection('orders')
      .where('uid', '==', firebase.auth().currentUser.uid)
      .where('oid', '==', oid)
      .get()
      .then(snapshot => {
        snapshot.forEach((doc, i) => {
          let order = doc.data()
          order.status = 'COMPLETE'
          db.collection('orders').doc(doc.id)
            .set(order)
            .then(res => {
              console.log('success')
              fetchMyOrders()
            }).catch(err => console.log(err))
        })
      }).catch(err => console.log(err))
  }

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <OrderItem
          oid={item.oid}
          date={item.date}
          total={dollar(item.total)}
          status={item.status}
          clickHandler={() => onOrderItemPress(item)}
          buttonClickHandler={onPickupPress}
        />
      )}
      keyExtractor={item => item.oid}
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
