import express from 'express';
import adminController from '../controllers/admin.controllers'
const adminRouter = express.Router();

adminRouter.post('/add-qa', adminController.addQA);
adminRouter.post('/add-subject', adminController.addSubject);
adminRouter.post('/add-contest', adminController.addContest);
adminRouter.post('/update-subject/:subjectId', adminController.updateSubject);
adminRouter.get('/get-questions-by-subject-id/:subjectId', adminController.getAllQuestionsBySubjectId);
module.exports = adminRouter;

