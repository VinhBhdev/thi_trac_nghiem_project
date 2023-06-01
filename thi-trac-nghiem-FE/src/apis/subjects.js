import axios from 'axios'

export const getAllSubjectsApi = async () => {
    const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/subjects"
    })
    return res.data;
};
