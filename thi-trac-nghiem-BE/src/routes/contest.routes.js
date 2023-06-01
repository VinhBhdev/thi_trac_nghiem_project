import express from 'express';
import contestController from '../controllers/contest.controllers'
const contestRouter = express.Router();

contestRouter.get('/:id', contestController.getAllQuestionsByContestId)
contestRouter.post('/submit', contestController.submitContest)
module.exports = contestRouter;

