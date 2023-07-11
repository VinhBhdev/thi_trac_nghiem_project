import axios from 'axios'


export const addQAApi = async (QA) => {
    console.log(">>>checkApi");
    console.log(QA);
    return await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/admin/add-qa",
        data: QA,
    })

};

export const uploadWordFileApi = async (form) => {
    return await axios({
        method: "POST",
        url: `http://localhost:3000/api/v1/admin/upload/${form.subjectId}`,
        data: form.formData,
    })

};