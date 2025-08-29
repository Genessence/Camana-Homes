import { Router } from 'express';
import { 
  createTourRequest, 
  createMortgageInquiry, 
  createGeneralLead, 
  createAgentContact, 
  createAgentProfileContact 
} from '../controllers/forms.controller.js';

export const formsRouter = Router();

console.log('Forms router created');

console.log('Forms router loaded with routes:');
console.log('- POST /forms/tour-requests');
console.log('- POST /forms/mortgage-inquiries');
console.log('- POST /forms/general-leads');
console.log('- POST /forms/agent-contacts');
console.log('- POST /forms/agent-profile-contacts');

// Add request logging middleware
formsRouter.use((req, res, next) => {
  console.log(`Forms router middleware: ${req.method} ${req.path}`);
  console.log(`Forms router: ${req.method} ${req.path}`);
  next();
});

// Test endpoint to verify router is working
formsRouter.get('/test', (req, res) => {
  console.log('Forms router /test endpoint accessed');
  res.json({ message: 'Forms router is working!', timestamp: new Date().toISOString() });
});

// Test POST endpoint
formsRouter.post('/test', (req, res) => {
  res.json({ 
    message: 'Forms POST router is working!', 
    timestamp: new Date().toISOString(),
    body: req.body 
  });
});

formsRouter.post('/tour-requests', createTourRequest);
formsRouter.post('/mortgage-inquiries', createMortgageInquiry);
formsRouter.post('/general-leads', createGeneralLead);
formsRouter.post('/agent-contacts', createAgentContact);
formsRouter.post('/agent-profile-contacts', createAgentProfileContact);
