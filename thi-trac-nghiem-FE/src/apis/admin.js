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

export const getAllQuestionsBySubjectIdApi = async (subjectId, page, search) => {
    let result = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/admin/get-questions-by-subject-id/${subjectId}?page=${page}&search=${search || ""}`,
    });
    return result;
};

export const getAllUsersApi = async (role) => {
    let result = await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/admin/get-all-users`,
        data: role,
    });
    return result;
};

export const validateUsersApi = async (usernames) => {
    let result = await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/admin/validate-users`,
        data: usernames,
    });
    return result;
};

export const getAllContestsForAdminApi = async (subjectId) => {
    console.log(">>>api");
    console.log(subjectId);
    let result = await axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/admin/all-contests/subjects/${subjectId}`,
    });
    console.log(">>>api");
    console.log(result);
    return result;
};

