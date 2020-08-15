import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import firebase from '../../Firebase'

import { ItemView } from '../subcomponents/ItemView'
import dollar from '../subcomponents/dollar'

export default function OrderConfirmation({ route, navigation }) {
  const emptyCart = route.params.emptyCart
  const modifyCart = route.params.modifyCart

  const [tips, setTips] = useState('0')
  const [tipsOptionIndex, setTipsOptionIndex] = useState(0)
  const [orderItems, setOrderItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  let cart = route.params.cart

  const Row = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.labelLeft}>{label}</Text>
      <Text style={styles.valueRight}>{value}</Text>
    </View>
  )

  const calculateSubtotal = () => {
    let currentSubtotal = 0
    orderItems.forEach((item, i) => {
      currentSubtotal += item.qty * item.price
    })
    setSubtotal(currentSubtotal)
  }

  const calculateTips = (percent) => {
    return `$${dollar(percent * subtotal)}`
  }

  const onDeletePress = (sku) => {
    for(let i = 0; i < cart.length; i++){
      if (cart[i].item.sku === sku) {
        cart.splice(i, 1)
        break
      }
    }
    modifyCart(cart)
    setOrderItems(getOrderItems())
  }

  const getOrderItems = () => {
    const result = cart.map(cartItem => {
        return {
          name: cartItem.item.name,
          sku: cartItem.item.sku,
          price: dollar(cartItem.item.price),
          qty: cartItem.qty
        }
      })
    return result
  }

  useEffect(() => {
    switch(tipsOptionIndex) {
      case 0:
        setTips(calculateTips(0.1))
        break
      case 1:
        setTips(calculateTips(0.15))
        break
      case 2:
        setTips(calculateTips(0.2))
        break
      default:
        setTips(calculateTips(0))
    }
  }, [tipsOptionIndex, subtotal])

  useEffect(() => {
    setOrderItems(getOrderItems())
  }, [cart])

  useEffect(() => {
    calculateSubtotal()
  }, [orderItems])

  useEffect(() => {
    setTax(subtotal * 0.13)
  }, [subtotal])

  useEffect(() => {
    setTotal(subtotal + parseInt(tips.replace('$', '')) + tax)
  }, [subtotal, tax, tips])

  const submitOrder = () => {
    // () => navigation.push('OrderSummary', { order: getOrder() })
    const date = new Date()
    const order = {
      uid: firebase.auth().currentUser.uid,
      oid: `MKD${date.valueOf()}`,
      date: date.toLocaleString(),
      orderItems: orderItems,
      tax: tax,
      tips: parseInt(tips.replace('$', '')),
      total: total,
      status: 'CONFIRMED'
    }

    firebase.firestore().collection('orders').add(order).then(doc => {
      emptyCart()
      navigation.push('OrderSummary', { order: order })
    }).catch(err => console.log(err))
  }

  return cart.length === 0 ? (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={{fontSize: 20}}>Your cart is empty!</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FlatList
          data={orderItems}
          renderItem={({ item }) => (
            <ItemView item={item} onDelete={onDeletePress} />
          )}
          keyExtractor={item => item.sku}
        />
        <Row label='subtotal:' value={`$${dollar(subtotal)}`} />
        <Row label='tax(13%):' value={`$${dollar(tax)}`} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
        <Text style={[styles.labelLeft, {paddingTop: 10}]}>Tips:</Text>
        <TextInput
          style={[styles.valueRight, styles.input]}
          placeholder='Tips'
          onChangeText={text => setTips(text)}
          value={tips}
        />
        </View>
        <SegmentedControlTab
          values={['10%', '15%', '20%', 'Other']}
          selectedIndex={tipsOptionIndex}
          onTabPress={setTipsOptionIndex}
          activeTabStyle={{backgroundColor: '#e91e63'}}
          tabStyle={{borderColor: '#000', marginTop: 5, marginBottom: 5, width: '100%'}}
          tabTextStyle={{color: '#000'}}

        />
        <Row label='total:' value={`$${dollar(total)}`} />
      </View>
      <TouchableOpacity style={[styles.button, {backgroundColor: orderItems.length === 0 ? '#d2698d' : '#e91e63'}]} onPress={submitOrder} disabled={orderItems.length === 0}>
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
    height: '100%'
  },
  input: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'right'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10
  },
  labelLeft: {
    width: '50%',
    textAlign: 'left',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#333333'
  },
  valueRight: {
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
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5
  }
});
