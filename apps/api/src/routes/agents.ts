import { Router } from 'express';
import { list, create, bySlug, remove } from '../controllers/agents.controller.js';
import { list as listAgencies } from '../controllers/agencies.controller.js';

export const agentsRouter = Router();

agentsRouter.get('/agents', list);
agentsRouter.get('/agencies', listAgencies);
agentsRouter.post('/agents', create);
agentsRouter.get('/agents/:slug', bySlug);
agentsRouter.delete('/agents/:id', remove);


