import axios from 'axios'


export const postSigninApi = async (user) => {

    return await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/signin",
        data: user,
    })

};


export const postSignupApi = async (user) => {

    return await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/signup",
        data: user,
    })

};


export const checkUserLoggedApi = async (token) => {
    return await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/check-user-logged",
        data: { token: token },
    })
}