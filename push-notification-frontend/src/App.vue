<template>
  <div id="app">
    <div>Welcome to the Vue-Push-Notifications-Starter demo!</div>
    <div>Click the subscribe button and you will receive a notification after 5 seconds.</div>
    <div>The push notification will only work if the browser is open and the user is not viewing the page</div>
    <div>If you are viewing the page you will only see an alert, but if you switch tabs or close the page you will see the Push Notification</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
