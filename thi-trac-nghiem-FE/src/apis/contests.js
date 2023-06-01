import axios from 'axios'


export const getAllContestsApi = async (subjectId) => {
    return await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/subjects/${subjectId}`
    })
};

export const submitContestApi = async (submitInfo) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/contest/submit`,
        data: submitInfo
    })
};