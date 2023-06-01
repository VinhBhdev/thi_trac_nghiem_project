import axios from 'axios'


const getAllUserApi = async () => {
    const res = await axios({
        method: "GET",
        url: "http://localhost:3000/users"
    })
    return res.data;
};

// export const createUserApi = async (user) => {
//     const res = await axios({
//         method: "POST",
//         url: "https://6447cab07bb84f5a3e490e48.mockapi.io/users",
//         data: user,
//     })
//     return res.data;
// }

// export const removeUserApi = async (id) => {
//     const res = await axios({
//         method: "DELETE",
//         url: `https://6447cab07bb84f5a3e490e48.mockapi.io/users/${id}`,
//     })
//     return res.data;
// }

// export const editUserApi = async (user) => {
//     const res = await axios({
//         method: "PUT",
//         url: `https://6447cab07bb84f5a3e490e48.mockapi.io/users/${user.id}`,
//         data: user,
//     })
//     return res.data;
// }

module.exports = {
    getAllUserApi,
}