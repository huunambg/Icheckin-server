const firebase = require('firebase/app');
require('firebase/auth'); // Nếu bạn muốn sử dụng Authentication
require('firebase/firestore'); // Nếu bạn muốn sử dụng Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDyeG8_S2TRZQCvx5uj69M_l-59oLwRB6g",
    authDomain: "icheckin-1db02.firebaseapp.com",
    projectId: "icheckin-1db02",
    storageBucket: "icheckin-1db02.appspot.com",
    messagingSenderId: "504497179223",
    appId: "1:504497179223:web:4f5f65297f59ba4ac73112",
    measurementId: "G-8WB0SK7RTZ"
  };  

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;