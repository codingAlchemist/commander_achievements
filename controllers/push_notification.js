const { sendNotification } = require('web-push');
const tools = require('../misc/tools')
const webPush = require('web-push');
var admin = require("firebase-admin");
var serviceAccount = require('../config/gameachievements-7d6e1-firebase-adminsdk-1tbbj-9d2fc89874.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

const vapidKeys = {
    "publicKey": tools.VAPID_PUBLIC_KEY,
    "privateKey": tools.VAPID_PRIVATE_KEY
};

const subscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/eFNz2j6oyB4:APA91bHVDQfLXBu3nZv4ZfIoMByHaqja4pA5-QtK-85dI2-HlX49JhZJOxIo64MYYojCuSeNooLSCbEGOO7k3mijdAVvpIYhCcSs4UGLTyMFXY2K0NMQSw9T5XH0LjNqfuNeU2_wEnWY",
    expirationTime: null,
    keys: {
        p256dh: "BIRhbarzShvOX6XuIZatPICZ10OjKfNrZF-npQwWRjKMFtsVPivloUqjTRLnxYyhzQy6rI3Jd3hhkz7JhJcKUoA",
        auth: "d1QHA3D6N725fOcY2ptvVQ"
    }
}
const parsedUrl = new URL(subscription.endpoint);
const audience = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

const vapidHeaders = webPush.getVapidHeaders(
    audience,
    'mailto: jason.debottis@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
    'aes128gcm'
);



sendPlayerJoinedEventNotification = (req, res) => {
    const registrationToken = req.body.registrationToken;
    const message = {
        data: {
            title: `player joined event`
        },
        token: registrationToken
    }
    admin.messaging().send(message)
        .then(response => {
            //res.status(200).send("Notification sent");
            console.log(message)
        }).catch(error => {
            console.log(error);
        });
}

sendTestNotification = (req, res) => {
    const registrationToken = req.body.registrationToken;
    const message = {
        data: {
            title: req.body.title,
            message: req.body.message
        },
        token: registrationToken
    }
    admin.messaging().send(message)
        .then(response => {
            res.status(200).send("Notification sent");
            console.log(message)
        }).catch(error => {
            console.log(error);
        });

}
module.exports = {
    sendTestNotification,
    sendPlayerJoinedEventNotification
}