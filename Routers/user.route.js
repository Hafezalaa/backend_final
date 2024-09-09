import express from "express"
import { login_validator, register_validator } from "../Validator/user.validator.js"
import resultHandler from "../Validator/resultHandler.js"
import { activator, user_edit_pass, user_login, user_logout, user_register } from "../Controllers/user.controllers.js"


const user_router = express.Router()

user_router.route('/register').post(register_validator, resultHandler, user_register)
user_router.route('/confirm/:activation/:_id').get(activator)
user_router.route('/login',).post(login_validator, resultHandler, user_login)
user_router.route('/logout').get(user_logout)
user_router.route('/edit_pass').patch(login_validator, resultHandler, user_edit_pass, /*email_sender*/)

export default user_router