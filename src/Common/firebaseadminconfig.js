const admin = require('firebase-admin');
const serviceAccount = require('./icheckin-1db02-firebase-adminsdk-s06s1-ae4fca4c99.json'); // Đường dẫn đến tệp JSON đã tải xuống

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
