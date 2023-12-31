import express from 'express';
import { findUsersByEducationController, findUsersByEmploymentController, getAllUserHandler, getMeHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);
router.post('/education', findUsersByEducationController);
router.post('/employment', findUsersByEmploymentController);
export default router; 
