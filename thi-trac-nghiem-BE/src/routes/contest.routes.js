import express from 'express';
import contestController from '../controllers/contest.controllers'
const contestRouter = express.Router();

contestRouter.get('/get-all-questions-by-enter-contest-id/:enterContestId', contestController.getAllQuestionsByEnterContestId)
contestRouter.post('/submit', contestController.submitContest)
contestRouter.post('/enter-contest', contestController.enterContest)
contestRouter.post('/get-end-time-of-contest', contestController.getEndTimeOfContest)
contestRouter.post('/get-contest-status', contestController.getContestStatus)
contestRouter.post('/get-all-contest', contestController.getAllContest);
contestRouter.get('/contest-rank/:contestId', contestController.getRankTable);
contestRouter.get('/contest-detail/:contestId', contestController.getContestDetail);

module.exports = contestRouter;

