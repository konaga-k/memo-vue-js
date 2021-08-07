// Firebase公式の指示通りに以下のコードをindex.htmlのbodyタグに埋め込むのみだと、App.vueで変数firebaseが利用できない
// jsから利用可能にするため、変数firebaseはmoduleからexportするようにした

require('dotenv').config()

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "memovuejs.firebaseapp.com",
  projectId: "memovuejs",
  storageBucket: "memovuejs.appspot.com",
  messagingSenderId: "324859741038",
  appId: "1:324859741038:web:873a2e56168d640331377f"
};

firebase.initializeApp(firebaseConfig);

export { firebase }
