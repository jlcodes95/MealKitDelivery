import React from 'react'
import { Button, TouchableOpacity, Text } from 'react-native'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import { FontAwesome5 } from '@expo/vector-icons'

function getHeaderRight(route) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Shop'
  switch (routeName) {
    case 'Shop':
      return () => (
        <TouchableOpacity style={{paddingRight: 20}} onPress={() => console.log('updating')}>
          <FontAwesome5 name='shopping-basket' size={24} color="black" />
        </TouchableOpacity>
      )
    default:
      return null
  }
}

export default getHeaderRight
