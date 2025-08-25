import { Router } from 'express';
import { healthRouter } from './health';
import { s3Router } from './s3';
import { propertiesRouter } from './properties';
import { articlesRouter } from './articles';
import { activityRouter } from './activity';
import { formsRouter } from './forms';
import { heroSlidesRouter } from './hero-slides';
import { agentsRouter } from './agents';

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


