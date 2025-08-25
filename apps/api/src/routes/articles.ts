import { Router } from 'express';
import { list, bySlug } from '../controllers/articles.controller';

export const articlesRouter = Router();

articlesRouter.get('/articles', list);
articlesRouter.get('/articles/:slug', bySlug);
