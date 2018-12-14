<script>
import firebase from 'firebase'


firebase.initializeApp(fbConfig)

export default {
    methods: {
        sendTokenToServer (currentToken) {
            if (!this.tokenSent) {
                this.$axios
                .post(this.$config.host + `/api/fcm/sendPush`, { token: currentToken })
                .then((res) => {
                    console.log(res)
                    this.tokenSent = true
                })
                .catch(() => {
                    this.tokenSent = false
                })
            } else {
                alert('Token already sent to server so won\'t send it again ' +
                    'unless it changes');
            }
        },
        getAndSendToken () {
            window.messaging.getToken().then((currentToken) => {
                console.log(currentToken)
                if (currentToken) {
                
                } else {
                // Show permission request.
                alert('Push service subscription failed. Please try again later.')
                this.tokenSent = false
                }
            }).catch((err) => {
                alert('An error occurred while retrieving token. ' + err)
                this.tokenSent = false
            });
        },
        mounted () {
            const fbConfig = {
                apiKey: "AIzaSyD2gCifW9ac1hlFpcywTGJTxzOHbLRA_Yw",
                authDomain: "push-notifications-fef03.firebaseapp.com",
                databaseURL: "https://push-notifications-fef03.firebaseio.com",
                projectId: "push-notifications-fef03",
                storageBucket: "push-notifications-fef03.appspot.com",
                messagingSenderId: "230112976648"
            }

            window.sendTokenToServer = this.sendTokenToServer

            if (firebase.messaging.isSupported()) {
                window.messaging = firebase.messaging()
                window.messaging.usePublicVapidKey('BEJDus6AkdKJ24XycGZN3kQozuPfRNzXssKLo-FVjKDp9dD8jLcns3ZE1vNEYBwWYUvsajzLVji8FKFq8x5s4c8')

                window.messaging.onTokenRefresh(() => {
                    window.messaging.getToken().then((refreshedToken) => {
                    this.tokenSent = false
                    // Send Instance ID token to app server.
                    window.sendTokenToServer(refreshedToken)
                    }).catch(function(err) {
                    alert('Unable to retrieve refreshed token ', err)
                    });
                });

                window.messaging.onMessage(function(payload) {
                    console.log('Message received. ', payload);
                    // ...
                });
            }
        }
    }    
}
</script>
