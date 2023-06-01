import QuestionModel from '../models/Question.models'
import AnswerModel from '../models/Answer.models'
import sequelize from "../configs/connection_database";
const { QueryTypes, and } = require('sequelize');
let getAllQuestionByContestIdServices = async (contestId) => {
    const questionsDB = await sequelize.query(`select Q.*, count(*) as number_result_question
    from contests as C, contest_question as CQ, questions as Q, result_question as RQ
    where C.id = CQ.contest_id
    and Q.id = CQ.question_id
    and Q.id = RQ.question_id
    and C.id = ${contestId} 
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
    const resultQuestions = await sequelize.query(`select RQ.* 
    from contest_question as CQ, result_question as RQ
    where CQ.question_id = RQ.question_id
    and CQ.contest_id = ${contestId};`, { type: QueryTypes.SELECT });
    return resultQuestions;
}

module.exports = {
    getAllQuestionByContestIdServices,
    getResultQuestionByContestId,
}