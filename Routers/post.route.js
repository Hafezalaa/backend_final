import express from 'express'
import { check_cookies } from '../MW/userMW.js'
import { post_validator } from '../Validator/post.validator.js'
import resultHandler from '../Validator/resultHandler.js'
import { get_posts, posting } from '../Controllers/post.controllers.js'





const post_router= express.Router()


post_router.route('/all').get(get_posts)
post_router.route('/posting').post(post_validator, resultHandler, posting)

export default post_router