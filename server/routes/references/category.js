import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../../controllers/references/category.js';
import {
  createCategoryValidation,
  deleteCategoryValidation,
  getCategoryValidation,
  updateCategoryValidation,
} from '../../utils/validations/references/category.js';

import referenceRoutes from './reference.js';
import { check } from 'express-validator';
import { validationMiddleware } from '../../middlewares/validation.js';
// import { accessAllowedTo, tokenProtection } from '../controllers/auth.js';

const router = Router();

router.use(
  '/:categoryId/references',
  [
    check('categoryId')
      .notEmpty()
      .withMessage('category id is required.')
      .isMongoId()
      .withMessage('category id must be valid mongodb id.'),
    validationMiddleware,
  ],
  referenceRoutes
);

router.get('/', getAllCategories);

router
  .route('/one/:id')
  .get(getCategoryValidation, getCategory)
  .patch(
    // tokenProtection,
    // accessAllowedTo('admin', 'manager'),

    updateCategoryValidation,
    updateCategory
  )
  .delete(
    // tokenProtection,
    // accessAllowedTo('admin'), // only admin can delete

    deleteCategoryValidation,
    deleteCategory
  );

// tokenProtection,
// accessAllowedTo('admin', 'manager'),
router.post(
  '/create',

  createCategoryValidation,
  createCategory
);

export default router;
