var admin = require("firebase-admin");

var serviceAccount = require('./gameachievements-7d6e1-firebase-adminsdk-1tbbj-9d2fc89874.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});