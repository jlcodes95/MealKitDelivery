import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import firebase from '../../Firebase'

TaskManager.defineTask('orderPickupPreparationCheck', ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
    prepareAvailableOrders()
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
})

const prepareAvailableOrders = async () => {
  console.log('preparing')
  firebase.firestore().collection('orders')
    .where('uid', '==', firebase.auth().currentUser.uid)
    .where('status', '==', 'CONFIRMED')
    .get()
    .then(snapshot => {
      console.log(snapshot)
      if (snapshot.length > 0) {
        //order needs to be changed
        alert('Your orders are being prepared now.')
        snapshot.forEach((doc) => {
          updateStatusOfDocument(doc, 'PREPARING')
        })
      }
      //else do nothing
    }).catch(err => console.log(err))
}

const updateStatusOfDocument = async (document, status) => {
  let updatedDoc = Object.assign({}, document.data())
  updatedDoc.status = status
  db.collection('orders').doc(document.id).set(updatedDoc)
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  })
}

const initialRegion = {
  latitude: 43.676206,
  longitude: -79.410522,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}

//referenced off of https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
const calculateDistance = (currentPosition, targetPosition) => {
  var R = 6371000 // Radius of the earth in m
  var latDelta = deg2rad(currentPosition.latitude - targetPosition.latitude)  // deg2rad below
  var lonDelta = deg2rad(currentPosition.longitude - targetPosition.longitude)
  var a =
    Math.sin(latDelta/2) * Math.sin(latDelta/2) +
    Math.cos(deg2rad(currentPosition.latitude)) * Math.cos(deg2rad(targetPosition.latitude)) *
    Math.sin(lonDelta/2) * Math.sin(lonDelta/2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  var d = R * c // Distance in m
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default function Pickup({ navigation }) {
  const [location, setLocation] = useState({latitude: -1, longitude: -1})
  const [region, setRegion] = useState(initialRegion)
  const [followUser, setFollowUser] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  const locationChangedCallback = (location) => {
    console.log(`${location.timestamp}: (${location.coords.latitude}, ${location.coords.longitude})`)
    let currentLocation = {latitude: location.coords.latitude, longitude: location.coords.longitude}
    console.log(`distance: ${calculateDistance(currentLocation, {latitude: 43.676206, longitude: -79.410522})}`)
    setLocation(currentLocation)
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
    Location.startGeofencingAsync('orderPickupPreparationCheck', [{
      identifier: 'LiveFit Foods',
      latitude: 43.676206,
      longitude: -79.410522,
      radius: 100,
      notifyOnEnter: true,
      notifyOnExit: true
    }])
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={initialRegion}
        showsUserLocation
      >
        <Marker
          coordinate={{latitude: 43.676206, longitude: -79.410522}}
          title='LiveFit Foods - Casa Loma'
          description='Casa Loma campus'
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
