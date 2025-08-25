import { Router } from 'express';
import { list, create, bySlug } from '../controllers/agents.controller';
import { list as listAgencies } from '../controllers/agencies.controller';

export const agentsRouter = Router();

agentsRouter.get('/agents', list);
agentsRouter.get('/agencies', listAgencies);
agentsRouter.post('/agents', create);
agentsRouter.get('/agents/:slug', bySlug);


