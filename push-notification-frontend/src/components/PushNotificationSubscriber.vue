<template>
  <div class="push-notification-subscriber">
    <button @click="subscribe">Subscribe</button>
    <button @click="unsubscribe">Unsubscribe</button>
  </div>
</template>

<script>
import sendPush from '../mixins/sendPush'

export default {
  name: 'PushNotificationSubscriber',
  mixins: [sendPush],
  methods: {
    subscribe () {
      window.messaging
        .requestPermission()
        .then(() => {
          console.log('subscribed successfully')
          if (window.location.host.indexOf('push-notifications-fef03') > -1) {
            this.getAndSendToken()
          }
        })
        .catch(function(err) {
          alert('Unable to get permission to notify: ' + err);
        });
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
