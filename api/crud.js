const FCM = require('fcm-node')
    
const serverKey = require('./firebase-private-key.json') // put the generated private key path here    

const fcm = new FCM(serverKey)

exports.sendPush = (req, res) => {

    const message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: req.body.token,
        notification: {
            title: 'Move a little', 
            body: "Take a break. Go for a stroll. The world wants you to be healthy!"
        }
    }
    
    fcm.send(message, (err, response) =>
        err
        ? res.status(500).send(err)
        : res.status(200).send(response)
    )
    
}