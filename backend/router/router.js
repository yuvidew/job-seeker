const express = require('express');
const { addUserInfo, addResume } = require('../controller/user.Info.controller');

const router = express.Router()

router.post('/post' , addUserInfo)
router.post("/post/:id" , addResume )

module.exports = router