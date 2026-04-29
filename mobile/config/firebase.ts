// mobile/config/firebase.ts
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAdwD61B3W2_7ogIjRwnLR0WmNgm5hpN4c",
  authDomain: "bahgo-ee71b.firebaseapp.com",
  databaseURL: "https://bahgo-ee71b-default-rtdb.asia-southeast1.firebaseio.com",
  projectId: "bahgo-ee71b",
  storageBucket: "bahgo-ee71b.firebasestorage.app",
  messagingSenderId: "734832326241",
  appId: "1:734832326241:android:5bb857abc9d4e4600e1c20",
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)