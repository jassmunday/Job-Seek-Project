import express from "express";
import {deleteJob, getAllJobs,getMyJobs,postJob, updateJob,getSingleJob, deleteJobAdmin, updateJobAdmin} from "../controllers/jobController.js"
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

router.get('/getall',getAllJobs);
router.post('/postjobs',isAuthorized,postJob);
router.get('/getmyjobs',isAuthorized,getMyJobs);
router.put('/update/:id',isAuthorized,updateJob);

router.put('/updatebyadmin/:id',updateJobAdmin);// For Admin

router.delete('/delete/:id',isAuthorized,deleteJob);

router.delete('/deletebyadmin/:id',deleteJobAdmin); // For Admin

router.get('/:id',isAuthorized,getSingleJob);

export default router;