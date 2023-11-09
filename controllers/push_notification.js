const { sendNotification } = require('web-push');
const sequelize = require("../models/sequelize_instance");
const tools = require('../misc/tools')
const webPush = require('web-push');
var admin = require("firebase-admin");
var serviceAccount = require('../config/gameachievements-7d6e1-firebase-adminsdk-1tbbj-9d2fc89874.json');
const { response } = require('express');
const Push_Token = require('../models/push_token')(sequelize);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const saveFCM = async (req, res) => {
    try {
        const push_token = await Push_Token.create({
            token: req.body.fcm,
            gameCode: req.body.gameCode
        })
        res.status(200).json(push_token);
    } catch (error) {
        console.error("error", error);
    }

}

const getAllFCM = async (gameCode) => {
    try {
        await Push_Token.findAll({
            gameCode: gameCode
        }).then((tokens) => {
            return tokens
        });
    } catch (error) {
        console.log("Error getting tokens", error)
    }
}
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
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
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

const sendPlayerJoinedGame = async (req, res) => {
    var player = req.body.player;
    var token = req.body.fcm;
    Push_Token.update({
        gameCode: req.body.gameCode
    }, {
        where: {
            token: token
        }
    }).then(async (result) => {
        await Push_Token.findAll({
            gameCode: req.body.gameCode
        }).then(async (tokens) => {
            var list = []
            tokens.forEach((token) => {
                list.push(token.token)
            })
            res.status(200).json([...list].pop())
            let current = [...list].pop()
            const message = {
                data: {
                    title: `${player} joined`,
                    message: req.body.message
                },
                tokens: [current]
            }
            admin.messaging().sendEachForMulticast(message).then((response) => {
                console.log(response)
                res.status(200).json({ result: "notification sent" })
            })
        });

    })

}
module.exports = {
    sendTestNotification,
    sendPlayerJoinedEventNotification,
    sendGameCreated,
    sendPlayerJoinedGame,
    saveFCM
}