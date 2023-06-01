import QuestionModel from '../models/Question.models'
import AnswerModel from '../models/Answer.models'
import ResultQuestionModel from '../models/ResultQuestion.models'
import SubjectModel from '../models/Subject.models'
import ContestModel from '../models/Contest.models'
import ContestQuestionModel from '../models/ContestQuestion.models'
let addQAServices = async (QAData) => {
    const questionData = await QuestionModel.create({
        subject_id: QAData.subjectId,
        question_text: QAData.question,
        question_description: '',
        topic: QAData.topic,
    });
    const questionId = questionData.dataValues.id;
    let answerIds = [];
    for (let answer of QAData.answersList) {
        const answerData = await AnswerModel.create({
            question_id: questionId,
            answer_text: answer,
            answer_description: ''
        });
        answerIds.push(answerData.dataValues.id);
    }
    for (let i = 0; i < QAData.resultQuestion.length; i++) {
        let result = QAData.resultQuestion[i];
        if (result) {
            console.log(result)
            await ResultQuestionModel.create({
                question_id: questionId,
                answer_id: answerIds[i],
            })
        }
    }
    return {
        message: "add QA successfully",
        QAData: QAData,
    }
}

let addSubjectServices = async (subject) => {
    const subjectDB = await SubjectModel.create({
        subject_name: subject.subjectName,
        subject_description: subject.subjectDescription,
        image_link: subject.imageLink,
    });
    return {
        message: "add subject successfully",
        subject: subjectDB,
    }
}

let addContestServices = async (contest) => {
    const contestDB = await ContestModel.create({
        contest_name: contest.contestName,
        open_contest: contest.openContest,
        close_contest: contest.closeContest,
        contest_time: contest.contestTime,
        subject_id: contest.subjectId,
    });
    const contestId = contestDB.dataValues.id;
    for (let questionId of contest.questionsListOfContest) {
        await ContestQuestionModel.create({
            contest_id: contestId,
            question_id: questionId,
        });
    }
    return {
        message: "add contest successfully",
        subject: contestDB,
    }
}

let updateSubjectServices = async (updateSubject) => {
    const findSubject = await SubjectModel.findOne({ where: { id: updateSubject.id } });
    if (findSubject) {
        findSubject.subject_name = updateSubject.subjectName;
        findSubject.subject_description = updateSubject.subjectDescription;
        findSubject.image_link = updateSubject.imageLink;
        await findSubject.save();
        return {
            message: "Update subject successfully",
            subject: findSubject,
        }
    }
}
let getAllQuestionsBySubjectIdServices = async (subjectId) => {
    const questionsDB = await QuestionModel.findAll({
        where: {
            subject_id: subjectId
        }
    })

    for (let question of questionsDB) {
        const answersDB = await AnswerModel.findAll({
            where: {
                question_id: question.id,
            }
        })
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
        tmp.topic = question.topic;
        tmp.questionDescription = question.question_description;
        tmp.answers = question.answers;
        if (question.answers.length > 1) tmp.typeQuestion = 'checkbox';
        else tmp.typeQuestion = 'radio';
        questionsList.push(tmp);
    })
    // console.log(">>services");
    // console.log(questionsList);
    return questionsList;
}
module.exports = {
    addQAServices,
    addSubjectServices,
    addContestServices,
    updateSubjectServices,
    getAllQuestionsBySubjectIdServices,
}