const router = require('express').Router()
const crud = require('./crud')

router.post('/sendPush', crud.sendPush)

module.exports = router