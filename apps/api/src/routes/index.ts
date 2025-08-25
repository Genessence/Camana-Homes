import { Router } from 'express';
import { healthRouter } from './health.js';
import { s3Router } from './s3.js';
import { propertiesRouter } from './properties.js';
import { articlesRouter } from './articles.js';
import { activityRouter } from './activity.js';
import { formsRouter } from './forms.js';
import { heroSlidesRouter } from './hero-slides.js';
import { agentsRouter } from './agents.js';

export const router = Router();

router.get('/ping', (_req, res) => res.json({ message: 'pong' }));
router.use(healthRouter);
router.use(s3Router);
router.use(propertiesRouter);
router.use(articlesRouter);
router.use(activityRouter);
router.use(formsRouter);
router.use(heroSlidesRouter);
router.use(agentsRouter);


