import express from "express";
import {employerGetAllAplications,jobSeekerGetAllAplications,postApplication,jobseekerDeleteApplication, getAllApplications, AdminDeleteApplication, employerDeleteApplication} from '../controllers/applicationController.js';
import {isAuthorized} from '../middlewares/auth.js';
const router = express.Router();

router.get('/employer/getApplications',isAuthorized,employerGetAllAplications);
router.get('/jobseeker/getApplications',isAuthorized,jobSeekerGetAllAplications);

router.get('/getAllApplications',getAllApplications);// For Admin

router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);
router.delete("/delete-emp/:id", isAuthorized, employerDeleteApplication);
router.delete("/delete-admin/:id", AdminDeleteApplication);
router.post('/post/applications',isAuthorized,postApplication);

export default router;

