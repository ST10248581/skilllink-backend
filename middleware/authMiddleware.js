const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('../prog7314poe-firebase-adminsdk-fbsvc-1ebf42746e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decoded.uid,
      email: decoded.email || '',
      name: decoded.name || decoded.displayName || 'Unknown'
    };

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(403).json({ error: 'Invalid token' });
  }
};