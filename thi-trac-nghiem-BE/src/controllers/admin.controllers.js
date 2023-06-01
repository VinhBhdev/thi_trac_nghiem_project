const SECRET = 'shhhhhh';
import adminServices from '../services/admin.services'


let addQA = async (req, res) => {
    try {
        const result = await adminServices.addQAServices(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let addSubject = async (req, res) => {
    try {
        const result = await adminServices.addSubjectServices(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


let addContest = async (req, res) => {

    try {
        let contest = req.body;
        contest.openContest = new Date(contest.openContest);
        contest.closeContest = new Date(contest.closeContest);
        const result = await adminServices.addContestServices(contest);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let updateSubject = async (req, res) => {
    try {
        let updateSubject = req.body;
        const result = await adminServices.updateSubjectServices(updateSubject);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let getAllQuestionsBySubjectId = async (req, res) => {
    try {
        let subjectId = req.params.subjectId;
        let result = await adminServices.getAllQuestionsBySubjectIdServices(subjectId);
        // const NUMBER_OF_QUESTIONS_PER_PAGE = 5;
        // result = result.slice((page - 1) * NUMBER_OF_QUESTIONS_PER_PAGE, page * NUMBER_OF_QUESTIONS_PER_PAGE);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addQA,
    addSubject,
    addContest,
    updateSubject,
    getAllQuestionsBySubjectId,
}
