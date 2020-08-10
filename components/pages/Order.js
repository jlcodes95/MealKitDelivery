import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import BrowseItem from '../subcomponents/BrowseItem'
import ItemDetail from './ItemDetail'

const OrderStack = createStackNavigator()

export default function Order({ navigation }) {

  const [list, setList] = useState([])

  useEffect(() => {
    setList([
      {
        id: 'ABC123',
        name: 'Value Meal Kit',
        desc: 'All of our bestselling value meals in one package for even less',
        calorie: 500,
        price: '$100',
      },{
        id: 'DEF456',
        name: 'Keto Meal Kit',
        desc: 'High fat, low carb meals with moderate protein to achieve and sustain ketosis',
        calorie: 700,
        price: '$200',
      },{
        id: 'GHI789',
        name: 'Vegan Meal Kit',
        desc: 'A fully plant-based package featuring vegan meat and no animal products',
        calorie: 300,
        price: '$10',
      },{
        id: 'XYZ000',
        name: 'Weight Loss Meal Kit',
        desc: 'High Protein, low-calorie meals with a nutrient profile tuned for weight loss',
        calorie: 400,
        price: '$120',
      }
    ])
  }, [])

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
          desc={item.desc}
          price={item.price}
          clickHandler={() => redirectDetail(item)}
        />
      )}
      keyExtractor={item => item.id}
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
