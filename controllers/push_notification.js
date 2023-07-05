const { sendNotification } = require('web-push');
const tools = require('../misc/tools')
const webPush = require('web-push');
var admin = require("firebase-admin");
var serviceAccount = require('../config/gameachievements-7d6e1-firebase-adminsdk-1tbbj-9d2fc89874.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


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
            res.status(200).send("Notification sent");
            console.log(message)
        }).catch(error => {
            console.log(error);
        });
}

sendGameCreated = (req, res) => {
    const registrationToken = req.body.registrationToken;
    const message = {
        data: {
            title: 'game created',
            message: req.body.message,
            game_id: req.body.game_id,
            players: JSON.stringify(req.body.players)
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

sendTestNotification = (req, res) => {
    const registrationToken = req.body.registrationToken;
    const message_notification = {
        notification: {
            title: "Test notification",
            body: req.body.message
        }
    }
    const message = {
        data: {
            title: req.body.title,
            message: req.body.message,
            test_value: req.body.test_value
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
    sendPlayerJoinedEventNotification,
    sendGameCreated
}