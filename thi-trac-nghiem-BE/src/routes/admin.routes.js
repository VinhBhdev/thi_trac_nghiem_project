import express from 'express';
import adminController from '../controllers/admin.controllers'
const adminRouter = express.Router();

adminRouter.post('/add-qa', adminController.addQA);
adminRouter.post('/add-subject', adminController.addSubject);
adminRouter.post('/add-contest', adminController.addContest);
adminRouter.post('/update-subject/:subjectId', adminController.updateSubject);
adminRouter.get('/get-questions-by-subject-id/:subjectId', adminController.getAllQuestionsBySubjectId);
adminRouter.post('/get-all-users', adminController.getAllUsers);
adminRouter.post('/upload/:subjectId', adminController.uploadFile);
adminRouter.post('/validate-users', adminController.validateUsers);
adminRouter.get('/all-contests/subjects/:subjectId', adminController.getAllContestsForAdmin);
module.exports = adminRouter;

