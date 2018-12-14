const router = require('express').Router()

router.use('/fcm', require('./fcm'))

module.exports = router