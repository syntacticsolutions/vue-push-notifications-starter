<script>
import firebase from 'firebase'
import { FB_CONFIG, VAPID_KEY, SERVER_URL } from '../fbConfig'


firebase.initializeApp(fbConfig)

export default {
    methods: {
        sendTokenToServer (currentToken) {
            if (!this.tokenSent) {
                this.$axios
                .post(SERVER_URL, { token: currentToken })
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
            const fbConfig = FBConfig

            window.sendTokenToServer = this.sendTokenToServer

            if (firebase.messaging.isSupported()) {
                window.messaging = firebase.messaging()
                window.messaging.usePublicVapidKey(VAPID_KEY)

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
