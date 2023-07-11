import axios from 'axios'


export const getAllQuestionsByEnterContestIdApi = async (enterContestId) => {
    let result = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/contest/get-all-questions-by-enter-contest-id/${enterContestId}`,
    });
    return result;

};


