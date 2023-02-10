import { check } from 'express-validator';
import { validationMiddleware } from '../../../middlewares/validation.js';
import { ReferenceCategoryModel } from '../../../models/references/category.js';

export const getCategoryValidation = [
  // check searches everywhere : params, body, headers
  check('id').isMongoId().withMessage('Invalid category id'),
  validationMiddleware,
];

// عشان احنا بنشيك بس علي الاي دي ف اانا عملت كدا لكن ف الطبيعي احنا هنعمل لكل واحدة فاليديشن
export const updateCategoryValidation = getCategoryValidation;
export const deleteCategoryValidation = getCategoryValidation;

export const createCategoryValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('category name is required.')
    .isLength({ min: 3 })
    .withMessage('name is too short')
    .isLength({ max: 32 })
    .withMessage('name is too long.')
    .custom(async (val, { req }) => {
      // category name is unique?.
      const categoryName = await ReferenceCategoryModel.findOne({ name: val });
      if (categoryName) {
        throw new Error(
          'Category name must be unique, please enter another name.'
        );
      }
      return true;
    }),

  validationMiddleware,
];
