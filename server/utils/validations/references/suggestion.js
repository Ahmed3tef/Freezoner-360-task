import { check } from 'express-validator';
import { validationMiddleware } from '../../../middlewares/validation.js';
import { ReferenceCategoryModel } from '../../../models/references/category.js';

export const createSuggestionValidation = [
  check('title').trim().notEmpty().withMessage('Suggestion title is required.'),

  check('description')
    .trim()
    .notEmpty()
    .withMessage('description is required.')
    .isLength({ max: 500 })
    .withMessage('description is too long.'),

  // check('date')
  //   .notEmpty()
  //   .withMessage('date is required.')
  //   .isISO8601()
  //   .withMessage('date must be a valid iso date format.'),

  check('employee')
    .trim()
    .notEmpty()
    .withMessage('employee name is required.')
    .isLength({ max: 40 })
    .withMessage('employee name is too long.'),

  check('categoryId')
    .notEmpty()
    .withMessage('categoryId is required.')
    .isMongoId()
    .withMessage('Invalid categoryId id format'),
  validationMiddleware,
];

export const getSuggestionValidation = [
  check('suggestionId').isMongoId().withMessage('Invalid Suggestion id format'),
  validationMiddleware,
];

export const getCategorySuggestionValidation = [
  check('categoryId').isMongoId().withMessage('Invalid Suggestion id format'),
  validationMiddleware,
];

export const deleteSuggestionValidation = [
  check('suggestionId')
    .isMongoId()
    .withMessage('Invalid Suggestion id format')
    .notEmpty()
    .withMessage('categoryId is required.'),

  check('categoryId')
    .notEmpty()
    .withMessage('categoryId is required.')
    .isMongoId()
    .withMessage('Invalid categoryId id format'),
  validationMiddleware,
];
