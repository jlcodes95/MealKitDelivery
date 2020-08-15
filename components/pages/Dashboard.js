import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native'

//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//icons
import { FontAwesome5 } from '@expo/vector-icons'

//pages
import Shop from './Shop'
// import Pickup from './Pickup'
import MyOrders from './MyOrders'
import Account from './Account'

const Tab = createBottomTabNavigator()

export default function Dashboard({ navigation }) {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Shop') {
            iconName = 'shopping-cart'
          }else if (route.name === 'Pickup') {
            iconName = 'car'
          }else if (route.name === 'MyOrders') {
            iconName = 'receipt'
          }else if (route.name === 'Account') {
            iconName = 'user-circle'
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: '#555555',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: 'white',
        }
      }}
    >
      <Tab.Screen name='Shop' component={Shop} />
      {/*<Tab.Screen name='Pickup' component={Pickup}/>*/}
      <Tab.Screen name='MyOrders' component={MyOrders} options={{tabBarLabel: 'My Orders'}}/>
      <Tab.Screen name='Account' component={Account}/>
    </Tab.Navigator>
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
