import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ProfileRow from '../subcomponents/ProfileRow'
import { LoadImage } from '../subcomponents/LoadImage'
import firebase from '../../Firebase'

export default function Profile({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState({uri: '', new: false})
  const [profile, setProfile] = useState(null)

  const launchCameraIOS = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== 'granted') {
      return null
    }
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    })
  }

  const launchCameraAndroid = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      return null
    }
    return await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    })
  }

  const pickImage = async () => {
    try {
      let result = Platform.os === 'ios' ? await launchCameraIOS() : await launchCameraAndroid()
      if (result === null) {
        alert('Sorry, we need camera permissions to make this work!')
        return
      }
      if (!result.cancelled) {
        setImage({
          uri: result.uri,
          new: true
        })
      }

      console.log(result)
    } catch (E) {
      alert(E)
    }
  }

  const uploadImage = async (imageName) => {
    try {
      const response = await fetch(image.uri);
      const blob = await response.blob()
      await firebase.storage().ref().child(imageName).put(blob)
      return true
    }catch (E) {
      console.log(E)
    }
    return false
  }

  const saveProfile = async () => {
    const imageName = `profiles/${new Date().valueOf()}.jpg`
    let newProfile = Object.assign({}, profile)
    newProfile.firstName = firstName
    newProfile.lastName = lastName
    newProfile.email = email
    newProfile.phone = phone
    if (image.new) {
      newProfile.image = imageName
      console.log(await uploadImage(imageName))
    }

    //save profile
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set(newProfile)
      .then(() => {
        navigation.pop()
        console.log('updated')
      }).catch(err => console.log(err))
  }

  const getProfile = async () => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setProfile(doc.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch(err => console.log(err))
  }

  const getImage = async () => {
    let uri = await LoadImage(image.uri)
    setImage({uri: uri, new: false})
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    if (profile != null){
      profile.firstName ? setFirstName(profile.firstName) : setFirstName('')
      profile.lastName ? setLastName(profile.lastName) : setLastName('')
      profile.email ? setEmail(profile.email) : setEmail('')
      profile.phone ? setPhone(profile.phone) : setPhone('')
      profile.image ? setImage({uri: profile.image, new: false}) : setImage({uri: '', new: false})
    }
  }, [profile])

  useEffect(() => {
    if (image.uri != '' && !image.new) {
      getImage()
    }
  }, [image])

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.image} onPress={pickImage}>
      <Image source={image.uri === '' ? require('../../assets/add.png') : {uri: image.uri}} style={{
        height: 200,
        width: 200,
        borderRadius: Platform.OS === 'ios' ? 200/2 : 200
        }}
      />
    </TouchableOpacity>
      <View style={{flex: 1, width: '100%'}}>
        <ProfileRow label='First Name' value={firstName} handler={setFirstName} editable={true}/>
        <ProfileRow label='Last Name' value={lastName} handler={setLastName} editable={true}/>
        <ProfileRow label='Email Address' value={email} handler={setEmail} editable={false}/>
        <ProfileRow label='Phone Number' value={phone} handler={setPhone} editable={false}/>
      </View>
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  image: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderRadius: Platform.OS === 'ios' ? 200/2 : 200
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    borderRadius: 5
  }
})
