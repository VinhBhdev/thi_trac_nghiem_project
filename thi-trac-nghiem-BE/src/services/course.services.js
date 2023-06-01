import Course from '../models/Course'

let getAllCoursesSevices = async () => {
    const data = await Course.findAll();
    let result = data.map(function (item) {
        return {
            id: item.id,
            imageUrl: item.image_link,
            courseName: item.course_name,
            courseDesc: item.course_description,
        }
    })
    return result;
}

module.exports = {
    getAllCoursesSevices,
}