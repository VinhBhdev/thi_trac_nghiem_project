const SECRET = 'shhhhhh';
import contestServices from '../services/contest.services'
import authServices from '../services/auth.services';
import sequelize from "../configs/connection_database";
const { QueryTypes, and } = require('sequelize');
let getAllQuestionsByEnterContestId = async (req, res) => {
    try {
        console.log(">>>getAllQuestionsByEnterContestId");
        const enterContestId = req.params.enterContestId;
        console.log(enterContestId)
        const result = await contestServices.getAllQuestionByEnterContestIdServices(enterContestId);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
function equalArray(arr1, arr2) {
    arr1.sort(function (a, b) { return a - b });
    arr2.sort(function (a, b) { return a - b });
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

async function storeUserAssignment(enterContestId, task, isCorrect) {
    await contestServices.storeUserAssignmentServices(enterContestId, task, isCorrect);
}
let evaluateAssignment = async (userAssignment, resultQuestions, enterContestId) => {
    let numberOfRightAnswers = 0;
    let userResult = [];
    for (let item of userAssignment) {
        let result = resultQuestions.find((result) => {
            return result.question_id == item.question.questionId;
        });
        if (result) {
            if (!Array.isArray(item.answer)) {
                item.answer = [item.answer];
            }
            let userAnswers = item.answer.map((item) => item.answerId);
            console.log(">>>userAnswers");
            console.log(userAnswers);
            console.log("result");
            console.log(result.answersList);
            if (equalArray(userAnswers, result.answersList)) {
                numberOfRightAnswers++;
                userResult.push({
                    ...item,
                    status: "AC",
                })
                await storeUserAssignment(enterContestId, item, 'AC');
            }
            else {
                userResult.push({
                    ...item,
                    status: "WA",
                })
                await storeUserAssignment(enterContestId, item, 'WA');
            }
        }
        else {
            userResult.push({
                ...item,
                status: "Not found",
            })
            await storeUserAssignment(enterContestId, item, 'Not found');
        }
    }
    return userResult;
}

async function findContestByEnterContestId(enterContestId) {
    try {
        const data = await sequelize.query(`
    select P.contest_id
    from enter_contest as EC, participations as P
    where EC.participation_id = P.id
    and EC.id = ${enterContestId}`, { type: QueryTypes.SELECT });
        console.log(data);
        return data[0].contest_id;
    } catch (error) {
        return error.message;
    }
}

async function storeContestPoint(enterContestId, point) {
    await contestServices.storeContestPointServices(enterContestId, point);
}
let submitContest = async (req, res) => {
    // console.log(req.body);
    let { enterContestId, userAssignment } = req.body;
    // filter erase null elements
    let contestId = await findContestByEnterContestId(enterContestId);
    console.log(">>>contestId");
    console.log(contestId);
    userAssignment = userAssignment.filter((item) => item);
    let resultQuestions = await contestServices.getResultQuestionByContestId(contestId);
    userAssignment.sort(function (a, b) { return a.question.questionId - b.question.questionId });
    console.log(">>>userAssignment");
    console.log(userAssignment);
    console.log(">>>resultQuestions");
    console.log(resultQuestions);
    let resultDetail = await evaluateAssignment(userAssignment, resultQuestions, enterContestId);
    resultDetail.sort(function (a, b) { return a.questionNumber - b.questionNumber })
    let userResult = {
        resultDetail: resultDetail,
        numberOfRightAnswers: resultDetail.filter((item) => item.status === "AC").length
    }
    await storeContestPoint(enterContestId, userResult.numberOfRightAnswers);
    // console.log(numberOfRightAnswers + " " + resultQuestions.length);
    res.json(userResult);
}
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
let enterContest = async (req, res) => {
    let enterContestData = req.body;
    let participation = await contestServices.getParticipationById(enterContestData.participationId);
    if (participation) {
        let contestTime = await contestServices.getContestTimeById(participation.contest_id);
        enterContestData.endTime = addMinutes(new Date(enterContestData.startTime), contestTime);
        let data = await contestServices.enterContestSevices(enterContestData);
        console.log(">>> data");
        console.log(data);
        res.json({
            data: data,
            message: "enter the contest sussessfully !"
        })
    }
    else {
        return res.json({
            message: "you don't have permission to enter this contest !"
        })
    }
}
let getEndTimeOfContest = async (req, res) => {
    try {
        let { enterContestId } = req.body;
        const endTime = await contestServices.getEndTimeOfContestServices(enterContestId);
        return res.status(200).json({
            endTime: endTime,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

let getContestStatus = async (req, res) => {
    try {
        let userAndContestInfo = req.body;
        let result = await contestServices.getContestStatusServices(userAndContestInfo);
        return res.status(200).json({
            status: result,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

function updateTimeZonePlus7(date) {
    return new Date(date.valueOf() + 25200000)
}

let getAllContest = async (req, res) => {
    try {
        let userAndSubjectData = req.body;
        console.log(userAndSubjectData);
        let contestsList = await contestServices.getAllContestServices(userAndSubjectData);
        let result = contestsList.reduce((result, item) => {
            let tmp = {};
            tmp.contestName = item.contest_name;
            tmp.id = item.id;
            tmp.openContest = updateTimeZonePlus7(item.open_contest);
            tmp.closeContest = updateTimeZonePlus7(item.close_contest);
            tmp.contestTime = item.contest_time;
            tmp.subjectId = item.subject_id;
            tmp.participationId = item.participation_id;
            tmp.status = item.status.status;
            tmp.enterContestId = item.status.enterContestId;
            result.push(tmp);
            return result;
        }, [])
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

let getRankTable = async (req, res) => {
    console.log("hello");
    try {
        let contestId = req.params.contestId;
        let rankTable = await contestServices.getRankTableServices(contestId);
        rankTable = rankTable.reduce((result, item, index) => {
            let tmp = {};
            tmp.rank = index + 1;
            tmp.userId = item.id;
            tmp.firstName = item.first_name;
            tmp.lastName = item.last_name;
            tmp.class = item.class;
            tmp.point = item.point;
            result.push(tmp);
            return result;
        }, [])
        res.status(200).json(rankTable);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


function dateToDatetimeLocalHtml(date) {
    date = date.toISOString().substring(0, 16);
    return date;
}
let getContestDetail = async (req, res) => {
    let { contestId } = req.params;
    let contest = await contestServices.getContestDetail(contestId);
    let result = {};
    result.contestName = contest.contest_name;
    result.id = contest.id;
    result.openContest = dateToDatetimeLocalHtml(updateTimeZonePlus7(contest.open_contest));
    result.closeContest = dateToDatetimeLocalHtml(updateTimeZonePlus7(contest.close_contest));
    result.contestTime = contest.contest_time;
    result.subjectId = contest.subject_id;
    result.questionsListOfContest = contest.questionsListOfContest;
    result.usersEnterContest = contest.usersEnterContest;
    result.usersList = contest.usersList;
    res.status(200).json(result);
}

module.exports = {
    getAllQuestionsByEnterContestId,
    submitContest,
    enterContest,
    getEndTimeOfContest,
    getContestStatus,
    getAllContest,
    getRankTable,
    getContestDetail,
}
