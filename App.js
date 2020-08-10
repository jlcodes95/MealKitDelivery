import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

//navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import getHeaderTitle from './components/subcomponents/getHeaderTitle'

//pages
import Dashboard from './components/pages/Dashboard'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import ItemDetail from './components/pages/ItemDetail'
import OrderConfirmation from './components/pages/OrderConfirmation'
import OrderSummary from './components/pages/OrderSummary'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerLeft: null
        })}/>
        <Stack.Screen
          name="Detail"
          component={ItemDetail}
          options={{
            headerTitle: null
          }}
        />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmation}
          options={{
            headerTitle: null
          }}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
          options={{
            headerTitle: null,
            headerLeft: null,
            gesturesEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
