const FCM = require('fcm-node')
    
const serverKey = require('./firebase-private-key.json') // put the generated private key path here    

const fcm = new FCM(serverKey)

exports.sendPushNotification = (channel, collapseKey, title, message) => {

    const message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: channel, 
        collapse_key: collapseKey,
        
        notification: {
            title: title, 
            body: message
        }
    }
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })
}