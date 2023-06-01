const SECRET = 'shhhhhh';
import subjectServices from '../services/subject.services'
let getAllSubjects = async (req, res) => {
    try {
        const result = await subjectServices.getAllSubjectsSevices();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function updateTimeZonePlus7(date) {
    return new Date(date.valueOf() + 25200000)
}
let gettAllContests = async (req, res) => {
    try {
        let subjectId = req.params.subjectId;
        let data = await subjectServices.gettAllContestsServices(subjectId);
        let result = data.reduce((result, item) => {
            let tmp = {};
            tmp.contestName = item.contest_name;
            tmp.id = item.id;
            tmp.openContest = updateTimeZonePlus7(item.open_contest);
            tmp.closeContest = updateTimeZonePlus7(item.close_contest);
            tmp.contestTime = item.contest_time;
            tmp.subjectId = item.subject_id;
            result.push(tmp);
            return result;
        }, [])

        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    getAllSubjects,
    gettAllContests,
}
