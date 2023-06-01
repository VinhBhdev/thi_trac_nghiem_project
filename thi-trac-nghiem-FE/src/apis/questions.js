import axios from 'axios'


export const getAllQuestionsByContestIdApi = async (contestId) => {
    let result = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/contest/${contestId}`,
    });
    return result;

};


