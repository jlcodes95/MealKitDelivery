import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default function OrderConfirmation({ route, navigation }) {
  const [tips, setTips] = useState('')
  const [tipsOptionIndex, setTipsOptionIndex] = useState(0)

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

  useEffect(() => {
    switch(tipsOptionIndex) {
      case 0:
        setTips('$10')
        break
      case 1:
        setTips('$15')
        break
      case 2:
        setTips('$20')
        break
      default:
        setTips('')
    }
  }, [tipsOptionIndex])

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.name}>{item.name}</Text>
        <Row label='order id:' value='ABC-991' />
        <Row label='price:' value='$150' />
        <Row label='tax(13%):' value='$15' />
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
    backgroundColor: '#e91e63',
  }
});
