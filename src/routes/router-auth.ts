import {Router} from "express";
import {loginController} from "../controller/login-controller";
import {
    authValidationMiddleware,
    codeValidationMiddleware, emailValidationMiddleware,
    userValidationMiddleware
} from "../middlewares/validation-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authJWTMiddleware} from "../middlewares/authorization-middleware";

export const loginRouter = Router({})

loginRouter.get('/me',
    authJWTMiddleware,
    loginController.getAuthUser)

loginRouter.post('/login',
    authValidationMiddleware,
    inputValidationMiddleware,
    loginController.loginUser)

loginRouter.post('/registration',
    userValidationMiddleware,
    inputValidationMiddleware,
    loginController.registrationNewUser)

loginRouter.post('/registration-confirmation',
    codeValidationMiddleware,
    inputValidationMiddleware,
    loginController.confirmUser)

loginRouter.post('/registration-email-resending',
    emailValidationMiddleware,
    inputValidationMiddleware,
    loginController.emailResending)
