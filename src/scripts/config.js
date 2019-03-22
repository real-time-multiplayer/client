// Initialize Firebase
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyABV3Cl31y7lToLhnwIUwbAkhjg3npnsSs',
  authDomain: 'bold-fox-2019-anton.firebaseapp.com',
  databaseURL: 'https://bold-fox-2019-anton.firebaseio.com',
  projectId: 'bold-fox-2019-anton',
  storageBucket: 'bold-fox-2019-anton.appspot.com',
  messagingSenderId: '671055566664'
}
firebase.initializeApp(config)

const database = firebase.firestore()

export default database
