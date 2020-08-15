import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import dollar from './dollar'

export const ItemView = ({ item, onDelete }) => {
  const onDeletePress = () => {
    onDelete(item.sku)
  }

  return (
    <View style={styles.itemRow}>
      <View style={{width: onDelete === null ? '80%' : '60%'}}>
        <Text style={{color: '#e91e63', fontSize: 20}}>{item.name}</Text>
        <Text style={{color: '#cccccc'}}>{item.sku}</Text>
        <View>
          <Text>{`${item.qty} x $${item.price}`}</Text>
        </View>
      </View>
      <View style={[styles.itemRowRight, {width: onDelete === null ? '20%' : '30%'}]}>
        <Text style={{color: '#e91e63', fontWeight: 'bold'}}>{`$${dollar(item.qty * item.price)}`}</Text>
      </View>
      <TouchableOpacity style={[styles.itemRowRight, {width: onDelete === null ? '0%' : '10%'}]} onPress={onDeletePress}>
        <FontAwesome5 name="trash-alt" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemRow: {
    width: '100%',
    flexDirection: 'row'
  },
  itemRowRight: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
