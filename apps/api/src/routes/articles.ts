import { Router } from 'express';
import { list, bySlug, remove, create } from '../controllers/articles.controller.js';

export const articlesRouter = Router();

articlesRouter.get('/articles', list);
articlesRouter.post('/articles', create);
articlesRouter.get('/articles/:slug', bySlug);
articlesRouter.delete('/articles/:id', remove);
