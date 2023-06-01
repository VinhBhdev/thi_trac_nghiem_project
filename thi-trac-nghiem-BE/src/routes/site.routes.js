import express from 'express';
import siteController from '../controllers/site.controllers'
const siteRouter = express.Router();

var jwt = require('jsonwebtoken');
const SECRET = 'shhhhhh';



siteRouter.get('/courses', siteController.getAllCourses)
siteRouter.post('/signin', siteController.postSignin)
siteRouter.post('/signup', siteController.postSignup)
siteRouter.get('/private', (req, res, next) => {
    try {
        let token = req.cookies.token;
        console.log(">>>Check token")
        console.log(token);
        let id = jwt.verify(token, SECRET);
        if (id) {
            next();
        }
    } catch (error) {
        res.json("ban phai dang nhap");
    }
}, (req, res) => res.json("welcome"))
siteRouter.post('/check-user-logged', siteController.checkUserLogged);
module.exports = siteRouter;

