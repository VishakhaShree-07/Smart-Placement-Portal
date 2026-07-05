import express from 'express';
import { getResources } from '../controllers/resourceController.js';

const router = express.Router();

router.route('/').get(getResources);

export default router;
