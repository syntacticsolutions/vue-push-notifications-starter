# vue-push-notifications-starter
Starter for FCM push notifications on a VueJS Frontend

## Getting Started: Backend

0. Clone the Repo
```
    $ git clone https://github.com/syntacticsolutions/vue-push-notifications-starter.git
    $ cd vue-push-notification-starter
```

0. Install Dependencies:
```
    npm i
```

0. If you haven't already: create your firebase app in GCP and get your private key.
0. First click <a href="https://console.firebase.google.com/u/0" target="_blank">here</a>
0. Then click on your project
0. Go to settings in the navigation drawer and click "Project Settings"
0. Click the "Service Accounts" Tab and then:

0. Click the "Generate new private key" button and copy the output into
``` /api/fcm/firebase-private-key.json ```

0. Change the message details in the sendToken function of
``` /api/fcm/crud.js ```

NOTE: This server is built to run on Serverless Google Cloud Functions, but will also work on any other type of container.
If you are using Google Cloud Functions, simply clone this repo into your root folder, follow the instructions above, deploy and it should work.

The following command is for deploying projects in Google Cloud Functions console.
```$ gcloud beta functions deploy pushNotifier --trigger-http ```


Otherwise you will have to uncomment the following line in your app.js

```javascript
// let port = 8081

// app.listen(port, () => {
//     console.log(`Express server running on port ${port}`)
// })
```

Then run ```$ node app``` in the root folder

## Getting Started: Frontend

The frontend is built in VueJS with the Vue-Cli 3 Webpack Configuration

it is located inside of the `/push-notification-frontend` folder

0. Change directories into the frontend folder.

```$ cd push-notification-frontend```

0. install dependencies
 ```$ npm i```

0. If you would like to use this as a starter app with push notifications you can test the app using

```$ npm run serve ```

NOTE: Serviceworkers are required for this to work and only work in HTTPS:// with third-party-cookies enabled

0. Build for production

```$ npm run build ```

0. The current build uses an existing firebase app public key
You will have to replace this with your public key unless you want a standard message(that is unchangeable)
I left this here for demoing purposes, but if you want to use your own push notifications you will need to have your own vapid key, and
firebase config info.

## To get your app-specific keys

0. Navigate to the <a href="https://console.firebase.google.com/u/0/project/_/settings/cloudmessaging/" target="_blank">Firebase cloud messaging console</a>
0. Select your project
0. In the "Web Configuration" Section: click the "Generate Key Pair" button and copy the output into your `VAPID_KEY` variable in
`/push-notification-frontend/src/fbConfig.vue`

0. Navigate to the <a href="https://console.firebase.google.com/u/0/" target="_blank">Firebase console</a>
0. Select your project
0. At the home page click the "+Add app" button
0. Choose web
0. Copy the firebase config object into your `FB_CONFIG` variable in
`/push-notification-frontend/src/fbConfig.vue`

0. One last thing
copy the `messagingSenderId` from the last step into the
`push-notification-frontend/public/firebase-messaging-sw.js` file
on line 10

## Run it
Run ```$ npm run build``` in the frontend folder to build for production.

Then deploy it to your server and everything should work like a charm.

Thanks for using this repo! Please feel free to submit pull requests and keep this repo up to date and easy to understand.
