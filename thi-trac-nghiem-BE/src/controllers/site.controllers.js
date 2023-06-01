// import pool from "../configs/configDB";
import authServices from '../services/auth.services'
import courseSevices from '../services/course.services'
var jwt = require('jsonwebtoken');
const SECRET = 'shhhhhh';

let getAllCourses = async (req, res) => {
    const result = await courseSevices.getAllCoursesSevices();
    res.status(200).json(result);
}
let postSignin = async (req, res) => {
    const user = req.body;
    try {
        const result = await authServices.signinServices(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
let postSignup = async (req, res) => {
    const user = req.body;
    try {
        const result = await authServices.signupServices(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

let checkUserLogged = async (req, res) => {
    try {
        let token = req.body.token;
        console.log(">>>Check token")
        console.log(token);
        let userId = jwt.verify(token, SECRET);
        if (userId) {
            const findUser = await authServices.findUserById(userId.id);
            // console.log(findUser);
            res.status(200).json(findUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postSignup,
    postSignin,
    getAllCourses,
    checkUserLogged,
}
