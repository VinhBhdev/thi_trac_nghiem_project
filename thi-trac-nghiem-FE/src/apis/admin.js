import axios from 'axios'


export const addSubjectApi = async (subject) => {
    return await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/admin/add-subject",
        data: subject,
    })

};

export const addContestApi = async (contest) => {
    return await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/admin/add-contest",
        data: contest,
    })

};
export const updateSubjectApi = async (updateSubject) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/admin/update-subject/${updateSubject.id}`,
        data: updateSubject,
    })

};

export const getAllQuestionsBySubjectIdApi = async (subjectId) => {
    let result = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/admin/get-questions-by-subject-id/${subjectId}`,
    });
    return result;
};
