import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

const initialRegion = {
  latitude: 43.5931,
  longitude: -79.6423,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}

export default function Pickup({ navigation }) {
  const [location, setLocation] = useState({latitude: 69, longitude: 69})
  const [errorMsg, setErrorMsg] = useState(null)

  const locationChangedCallback = (location) => {
    console.log(`${location.timestamp}: (${location.coords.latitude}, ${location.coords.longitude})`)
    setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude})
  }

  const subscribeToLocationChanges = async () => {
    // 1. ask for permission
    let { status } = await Location.requestPermissionsAsync()
    if (status === 'granted') {
      let location = await Location.watchPositionAsync({accuracy: Location.Accuracy.Highest, timeInterval: 2000}, locationChangedCallback)
      // console.log(JSON.stringify(location))
    } else {
      console.log('permission denied')
    }
  }

  useEffect(() => {
    subscribeToLocationChanges()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{latitude: 43.676206, longitude: -79.410522}}
          title='LiveFit Foods - Casa Loma'
          description='Casa Loma campus'
        />
        <Marker
          coordinate={{latitude: 43.651393, longitude: -79.370180}}
          title='LiveFit Foods - St.James'
          description='St.James campus'
        />
        <Marker
          coordinate={{latitude: 43.644025, longitude: -79.365422}}
          title='LiveFit Foods - Waterfront'
          description='Waterfront campus'
        />
        <Marker
          coordinate={location}
          title='ME'
          description='IM OVER HERE'
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
