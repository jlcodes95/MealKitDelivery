import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import OrderItem from '../subcomponents/OrderItem'

export default function MyOrders({ navigation }) {

  const [list, setList] = useState([])

  useEffect(() => {
    setList([
      {
        id: 'ABC123',
        name: 'Value Meal Kit',
        date: '2020-08-10',
        total: '$100',
      },{
        id: 'DEF456',
        name: 'Meat Meal Kit',
        date: '2020-08-10',
        total: '$200',
      },{
        id: 'GHI789',
        name: 'Trash Veggie Meal Kit',
        date: '2020-08-10',
        total: '$10',
      },{
        id: 'XYZ000',
        name: 'Cheese Meal Kit',
        date: '2020-08-10',
        total: '$120',
      }
    ])
  }, [])

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (<OrderItem name={item.name} date={item.date} total={item.total} clickHandler={() => console.log(`go to details for ${item.id}`)} />)}
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
