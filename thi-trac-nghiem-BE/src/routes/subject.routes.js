import express from 'express';
import subjectController from '../controllers/subject.controllers'
const subjectRouter = express.Router();

subjectRouter.get('/', subjectController.getAllSubjects);
subjectRouter.get('/:subjectId', subjectController.gettAllContests);
module.exports = subjectRouter;

