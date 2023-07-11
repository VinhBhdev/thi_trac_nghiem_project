import axios from 'axios'


// export const getAllContestsApi = async (subjectId) => {
//     return await axios({
//         method: "POST",
//         url: `http://localhost:3000/api/v1/subjects/${subjectId}`
//     })
// };

export const getAllContestsApi = async (info) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/contest/get-all-contest`,
        data: info,
    })
}

export const submitContestApi = async (submitInfo) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/contest/submit`,
        data: submitInfo
    })
};

export const enterContestApi = async (enterContestData) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/contest/enter-contest`,
        data: enterContestData
    })
}

export const getEndTimeOfContestApi = async (userAndContestInfo) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/contest/get-end-time-of-contest`,
        data: userAndContestInfo,
    })
}

export const getContestStatusApi = async (userAndContestInfo) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/contest/get-contest-status`,
        data: userAndContestInfo,
    })
}

export const getContestRankApi = async (contestId) => {
    return await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/contest/contest-rank/${contestId}`
    })
}

export const getContestDetailApi = async (contestId) => {
    return await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/contest/contest-detail/${contestId}`
    })
}