import { Router } from 'express';
import { createTourRequest, createMortgageInquiry } from '../controllers/forms.controller';

export const formsRouter = Router();

formsRouter.post('/tour-requests', createTourRequest);
formsRouter.post('/mortgage-inquiries', createMortgageInquiry);
