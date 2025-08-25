import { Router } from 'express';
import { createTourRequest, createMortgageInquiry } from '../controllers/forms.controller.js';

export const formsRouter = Router();

formsRouter.post('/tour-requests', createTourRequest);
formsRouter.post('/mortgage-inquiries', createMortgageInquiry);
