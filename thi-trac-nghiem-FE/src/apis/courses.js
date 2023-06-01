import axios from 'axios'


export const getAllCoursesApi = async () => {
    const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/courses"
    })
    return res.data;
};
