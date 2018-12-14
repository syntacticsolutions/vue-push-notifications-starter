import vue from 'vue'
import VueRouter from 'vue-router'
import PushNotificationSubscriber from './components/PushNotificationSubscriber'

vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: PushNotificationSubscriber
        }
    ]
})