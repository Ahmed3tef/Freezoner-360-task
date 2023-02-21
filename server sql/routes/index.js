// routes
import categoryRoutes from './references/category.js';
import referenceRoutes from './references/reference.js';
import suggestionRoutes from './references/suggestion.js';

export const appRoutes = app => {
  // app routes

  app.use('/categories', categoryRoutes);
  app.use('/references', referenceRoutes);
  app.use('/suggestions', suggestionRoutes);
};
