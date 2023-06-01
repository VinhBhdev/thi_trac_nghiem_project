const SECRET = 'shhhhhh';
import contestServices from '../services/contest.services'
let getAllQuestionsByContestId = async (req, res) => {
    try {
        const contestId = req.params.id;
        const result = await contestServices.getAllQuestionByContestIdServices(contestId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
let submitContest = async(req, res) => {
    console.log(req.body);
    res.json(req.body);
    let {contestId, userAssignment} = req.body;
    let resultQuestions = await contestServices.getResultQuestionByContestId(contestId);
    

}
module.exports = {
    getAllQuestionsByContestId,
    submitContest,
}
