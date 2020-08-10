import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

export default function OrderConfirmation({ route, navigation }) {
  const item = route.params.item

  const Row = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.labelLeft}>{label}</Text>
      <Text style={styles.valueRight}>{value}</Text>
    </View>
  )

  const order = {
    id: 'ABC-991',
    price: '$150',
    tax: '$15',
    total: '$165',
    date: '2020-08-10'
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{item.name}</Text>
        <Row label='order id:' value='ABC-991' />
        <Row label='price:' value='$150' />
        <Row label='tax(13%):' value='$15' />
        <Row label='total:' value='$165' />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('OrderSummary', { order: order })}>
        <Text>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    borderWidth: 0.2
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1
  },
  labelLeft: {
    borderWidth: 1,
    width: '50%',
    textAlign: 'left',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#333333'
  },
  valueRight: {
    borderWidth: 1,
    width: '50%',
    textAlign: 'right',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#e91e63'
  },
  name: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#e91e63',
    fontWeight: '500',
    fontSize: 25
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#e91e63',
  },
  desc: {
    color: '#888888',
    fontSize: 12
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    borderWidth: 2
  }
});
