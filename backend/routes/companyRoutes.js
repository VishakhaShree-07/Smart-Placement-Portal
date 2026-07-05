import express from 'express';
import { getCompanies, getCompanyById } from '../controllers/companyController.js';

const router = express.Router();

router.route('/').get(getCompanies);
router.route('/:id').get(getCompanyById);

export default router;
