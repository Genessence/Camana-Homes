import { Router } from 'express';
import { trending, featured, bySlug, stats, list, isSlugAvailable, create, deleteProperty, toggleFeatured } from '../controllers/properties.controller.js';

export const propertiesRouter = Router();

propertiesRouter.get('/properties', list);
propertiesRouter.get('/properties/slug-available', isSlugAvailable);
propertiesRouter.get('/properties/trending', trending);
propertiesRouter.get('/properties/featured', featured);
propertiesRouter.post('/properties', create);
propertiesRouter.get('/properties/:slug', bySlug);
propertiesRouter.get('/properties/:slug/stats', stats);
propertiesRouter.delete('/properties/:id', deleteProperty);
propertiesRouter.patch('/properties/toggle-featured/:id', toggleFeatured);


