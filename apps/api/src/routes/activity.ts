import { Router } from 'express';
import { trackView, recentlyViewed } from '../controllers/activity.controller.js';

export const activityRouter = Router();

activityRouter.post('/activity/view-property', trackView);
activityRouter.get('/recently-viewed', recentlyViewed);
