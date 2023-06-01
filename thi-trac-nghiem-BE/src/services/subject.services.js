import SubjectModel from '../models/Subject.models'
import ContestModel from '../models/Contest.models'

let getAllSubjectsSevices = async () => {
    const data = await SubjectModel.findAll();
    let result = data.map(function (item) {
        return {
            id: item.id,
            imageLink: item.image_link,
            subjectName: item.subject_name,
            subjectDescription: item.subject_description,
        }
    })
    return result;
}

let gettAllContestsServices = async (subjectId) => {
    const data = await ContestModel.findAll({
        where: {
            subject_id: subjectId
        }
    });
    return data;
}
module.exports = {
    getAllSubjectsSevices,
    gettAllContestsServices,

}