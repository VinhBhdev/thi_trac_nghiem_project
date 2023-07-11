import QuestionModel from '../models/Question.models'
import AnswerModel from '../models/Answer.models'
import EnterContestModel from '../models/EnterContest.models'
import ContestModel from '../models/Contest.models'
import ParticipationsModel from '../models/Participations.models'
import AssignmentQuestionsModel from '../models/AssignmentQuestions.models'
import AssignmentAnswersModel from '../models/AssignmentAnswers.models'
import ContestQuestionModel from '../models/ContestQuestion.models'

import sequelize from "../configs/connection_database";
const { QueryTypes, and } = require('sequelize');
let getAllQuestionByEnterContestIdServices = async (enterContestId) => {
    let enterContestDB = await getEnterContestById(enterContestId);
    let participation = await getParticipationById(enterContestDB.participation_id);
    console.log(">>>participation");
    console.log(participation);
    const questionsDB = await sequelize.query(`select Q.*, count(*) as number_result_question
    from contests as C, contest_question as CQ, questions as Q, result_question as RQ
    where C.id = CQ.contest_id
    and Q.id = CQ.question_id
    and Q.id = RQ.question_id
    and C.id = ${participation.contest_id} 
    group by Q.id;`, { type: QueryTypes.SELECT });

    for (let question of questionsDB) {
        const answersDB = await sequelize.query(`select id, question_id, answer_text, answer_description 
        from answers
        where question_id = ${question.id};`, { type: QueryTypes.SELECT })
        let answers = [];
        answersDB.forEach((answer, index) => {
            let tmp = {};
            tmp.answerId = answer.id;
            tmp.questionId = answer.question_id;
            tmp.answerText = answer.answer_text;
            tmp.answerDesciption = answer.answer_description;
            answers.push(tmp);
        });
        question.answers = answers;
        // console.log(answersDB);
    }
    let questionsList = [];
    questionsDB.forEach((question, index) => {
        let tmp = {};
        tmp.questionId = question.id;
        tmp.subjectId = question.subject_id;
        tmp.questionText = question.question_text;
        tmp.questionDescription = question.question_description;
        tmp.answers = question.answers;
        if (+question.number_result_question > 1) tmp.typeQuestion = 'checkbox';
        else tmp.typeQuestion = 'radio';
        questionsList.push(tmp);
    })
    // console.log(">>services");
    // console.log(questionsList);
    return questionsList;
}

let getResultQuestionByContestId = async (contestId) => {
    const data = await sequelize.query(`select RQ.* 
    from contest_question as CQ, result_question as RQ
    where CQ.question_id = RQ.question_id
    and CQ.contest_id = ${contestId};`, { type: QueryTypes.SELECT });

    let questionsList = data.reduce((result, QA) => {
        if (result.indexOf(QA.question_id) == -1) {
            result.push(QA.question_id);
        }
        return result;
    }, [])
    questionsList.sort(function (a, b) { return a - b });

    let resultQuestions = [];
    for (let question_id of questionsList) {
        let answersList = data.reduce((result, QA) => {
            if (question_id === QA.question_id) {
                result.push(QA.answer_id);
            }
            return result;
        }, []);
        resultQuestions.push({
            question_id,
            answersList,
        })
    }

    return resultQuestions;
}

let enterContestSevices = async (enterContestData) => {
    let { participationId, startTime, endTime } = enterContestData;
    console.log(">>> entercontestdata");
    console.log(enterContestData);
    return await EnterContestModel.create({
        participation_id: participationId,
        start_time: startTime,
        end_time: endTime,
        point: 0
    })
}

let getContestTimeById = async (contestId) => {
    let contestFind = await ContestModel.findOne({
        where: {
            id: contestId,
        }
    })
    return contestFind.contest_time;
}

let getEndTimeOfContestServices = async (enterContestId) => {
    let contestsList = await EnterContestModel.findAll({
        where: {
            id: enterContestId
        }
    })
    return contestsList[contestsList.length - 1].end_time;
}

async function getParticipationById(id) {
    const participation = ParticipationsModel.findOne({
        where: {
            id: id
        }
    })
    return participation;
}

async function getEnterContestById(id) {
    const enterContest = EnterContestModel.findOne({
        where: {
            id: id
        }
    })
    return enterContest;
}

async function getContestStatusServices(participationId) {
    let participation = getParticipationById(participationId);
    if (participation) {
        let contestsList = await EnterContestModel.findAll({
            where: {
                participation_id: participationId
            }
        })
        if (contestsList.length > 0) {
            let enterContest = contestsList[contestsList.length - 1];
            let current = new Date();
            if (enterContest.end_time < current) return { status: "da ket thuc", enterContestId: enterContest.id }; // đã kết thúc contest
            else if (enterContest.start_time < current) return { status: "dang lam", enterContestId: enterContest.id }; // đang làm contest
        }
        else return { status: "chua lam" }; // chưa làm contest
    }
    else return -1; // don't have permission to enter this contest!
}

let getAllContestServices = async (userAndSubjectInfo) => {
    let { userId, subjectId } = userAndSubjectInfo;
    const data = await sequelize.query(`
    select C.*, P.id as participation_id 
    from participations as P, subjects as S, contests as C
    where P.user_id = ${userId}
    and P.contest_id = C.id
    and S.id = ${subjectId}
    and C.subject_id = S.id
    order by C.id desc`, { type: QueryTypes.SELECT });
    for (let item of data) {
        item.status = await getContestStatusServices(item.participation_id);
    }
    console.log(">>>data");
    console.log(data);
    return data;
}
let storeUserAssignmentServices = async (enterContestId, task, isCorrect) => {
    let userAssignmentQuestionDB = await AssignmentQuestionsModel.create({
        enter_contest_id: enterContestId,
        question_id: task.question.questionId,
        is_correct: isCorrect,
    })
    let userAssignmentQuestionId = userAssignmentQuestionDB.dataValues.id;
    for (let answer of task.answer) {
        await AssignmentAnswersModel.create({
            assignment_question_id: userAssignmentQuestionId,
            answer_id: answer.answerId,
        })
    }
}

let storeContestPointServices = async (enterContestId, point) => {
    let enterContestDB = await EnterContestModel.findOne({
        where: {
            id: enterContestId,
        }
    })
    enterContestDB.point = point;
    enterContestDB.save();
}

let getRankTableServices = async (contestId) => {
    const enterContestPointData = await sequelize.query(`
    select U.id, U.first_name, U.last_name, U.class, EC.point
    from contests as C, participations as P, enter_contest as EC, users as U
    where C.id = P.contest_id
    and P.id = EC.participation_id
    and P.user_id = U.id
    and C.id = ${contestId}
    order by EC.point desc`, { type: QueryTypes.SELECT });

    const participationData = await sequelize.query(`
    select U.id, U.first_name, U.last_name, U.class
    from participations as P, users as U
    where P.contest_id = ${contestId} 
    and p.user_id = U.id`, { type: QueryTypes.SELECT });

    for (let item of participationData) {
        let found = enterContestPointData.find((x) => x.id === item.id);
        if (found) item.point = found.point;
        else item.point = 0;
    }

    participationData.sort(function (a, b) {
        if (a.point != b.point)
            return b.point - a.point;
        return a.id - b.id;
    })
    return participationData;
}

let getContestDetail = async (contestId) => {
    let contest = await ContestModel.findOne({
        where: {
            id: contestId,
        }
    })
    contest = contest.dataValues;
    let questions = await ContestQuestionModel.findAll({
        attributes: ['question_id'],
        where: {
            contest_id: contestId,
        }
    })
    questions = questions.map((item) => item.dataValues.question_id);

    const usersList = await sequelize.query(`
    select  U.id, U.first_name, U.last_name, U.class, U.username
    from participations as P, users as U
    where P.contest_id = ${contestId}
    and P.user_id = U.id;`, { type: QueryTypes.SELECT });


    contest.questionsListOfContest = questions;
    contest.usersEnterContest = usersList.map((user) => user.id);
    contest.usersList = usersList;
    console.log(contest);
    return contest;
}
module.exports = {
    getAllQuestionByEnterContestIdServices,
    getResultQuestionByContestId,
    enterContestSevices,
    getContestTimeById,
    getEndTimeOfContestServices,
    getContestStatusServices,
    getAllContestServices,
    getParticipationById,
    storeUserAssignmentServices,
    storeContestPointServices,
    getRankTableServices,
    getContestDetail
}