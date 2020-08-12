import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBY3r8MHL39DRXCW0EhfIiroD7_XzdqfQM',
    authDomain: 'mealkitdeliveryrn.firebaseapp.com',
    databaseURL: 'https://mealkitdeliveryrn.firebaseio.com',
    projectId: 'mealkitdeliveryrn',
    storageBucket: 'mealkitdeliveryrn.appspot.com',
    messagingSenderId: '633690727325',
    appId: '1:633690727325:web:068971727d4ed50b618574',
    measurementId: 'G-QDM3G38J5W'
  }
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
