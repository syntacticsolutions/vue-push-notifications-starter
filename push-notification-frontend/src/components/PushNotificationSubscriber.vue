<template>
  <div class="push-notification-subscriber">
    <button @click="subscribe">Subscribe</button>
    <button @click="unsubscribe">Unsubscribe</button>
  </div>
</template>

<script>

// import { Button } from 'element-ui'
import firebase from 'firebase'

const fbConfig = {
  apiKey: "AIzaSyD2gCifW9ac1hlFpcywTGJTxzOHbLRA_Yw",
  authDomain: "push-notifications-fef03.firebaseapp.com",
  databaseURL: "https://push-notifications-fef03.firebaseio.com",
  projectId: "push-notifications-fef03",
  storageBucket: "push-notifications-fef03.appspot.com",
  messagingSenderId: "230112976648"
}

firebase.initializeApp(fbConfig)

export default {
  name: 'PushNotificationSubscriber',
  // components: {
  //   "el-button": Button
  // },
  props: {
    
  },
  data: () => ({
    messaging: undefined
  }),
  methods: {
    subscribe () {
      window.messaging
        .requestPermission()
        .then(() => {
          alert('Notification permission granted.');
          this.getAndSendToken()
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
        })
        .catch(function(err) {
          alert('Unable to get permission to notify: ' + err);
        });
    },
    getAndSendToken () {
      window.messaging.getToken().then((currentToken) => {
        console.log(currentToken)
        if (currentToken) {
          setTimeout(() => {
            window.sendTokenToServer(currentToken);
          }, 3000)
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
    sendTokenToServer (currentToken) {
      if (!this.tokenSent) {
        setTimeout
        this.$axios
          .post(this.$config.host + '/api/sendPush', { token: currentToken })
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
    unsubscribe () {
        // Delete Instance ID token.
      window.messaging.getToken().then((currentToken) => {
        window.messaging.deleteToken(currentToken).then(() => {

          this.tokenSent = false
        }).catch(function(err) {
          alert('Unable to delete token. ', err)
        })

      }).catch(function(err) {
        alert('Error retrieving Instance ID token. ', err)
      });
    }
  },
  mounted () {
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
