const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Đường dẫn đến tệp JSON đã tải xuống

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
