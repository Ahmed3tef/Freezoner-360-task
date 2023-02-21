import { check } from 'express-validator';

import { ReferenceModel } from '../../../models/references/reference.js';

import { validationMiddleware } from '../../../middlewares/validation.js';

export const createReferenceValidation = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('title is required.')
    .isLength({ min: 3 })
    .withMessage('title is too short.'),

  check('description')
    .trim()
    .notEmpty()
    .withMessage('description is required.')
    .isLength({ min: 3 })
    .withMessage('description is too short.')
    .isLength({ max: 500 })
    .withMessage('description is too long.'),

  check('file').notEmpty().withMessage('file is required.'),
  check('author')
    .trim()
    .notEmpty()
    .withMessage('author name is required.')
    .isLength({ min: 3 })
    .withMessage('author name is too short.'),

  check('reviewer').trim().notEmpty().withMessage('reviewer name is required.'),
  check('referenceCode')
    .trim()
    .notEmpty()
    .withMessage('reference code is required.'),

  check('categoryId')
    .notEmpty()
    .withMessage('category id is required.')
    .isMongoId()
    .withMessage('category id must be valid mongodb id.').custom(async (val, { req }) => {
      req.body.categoryId = val;
    }),
  validationMiddleware,
];

export const getAllReferenceValidation = [
  check('id').isMongoId().withMessage('Invalid reference id'),
  validationMiddleware,
];
export const getSearchReferenceValidation = [
  check('keyword').trim()
    .notEmpty()
    .withMessage('search keyword is required.'),
  validationMiddleware,
];

export const getReferenceValidation = [
  check('id').isMongoId().withMessage('Invalid reference id'),
  validationMiddleware,
];

export const deleteReferenceValidation = [
  check('id')
    .isMongoId()
    .withMessage('Invalid reference id')
    .custom(async (val, { req }) => {
      const reference = await ReferenceModel.findById(val);

      if (!reference)
        return Promise.reject(new Error(`no reference found with this id.`));

      return true;
    }),
  validationMiddleware,
];

export const updateReferenceValidation = [
  check('id')
    .isMongoId()
    .withMessage('Invalid reference id')
    .custom((val, { req }) => {
     
        ReferenceModel.findById(val).then(reference => {
          if (!reference)
            return Promise.reject(
              new Error(`no reference found with this id.`)
            );

          // هنا بقوله لو اليوزر اللي عايز يعمل الديليت مش هو اليوزر اللي عامل لوجن .. فيما معناه ان اليوزر اللي داخل هنا عندي هو اللي لازم يكون عامل الرفرنس والا مش هيعرف يمسحها
          // if (req.user._id.toString() !== reference.user._id.toString())
          //   return Promise.reject(
          //     new Error(`user can't make more than one review on a product.`)
          //   );
        });

        // كدا كدا لازم هيكون عندي توكن بدخل بيها .. حالة اليوزر احنا عملناها واللي باقي هيكون ادمن ومانجر فالاتنين دول كدا ممكن يمسحوا  الرفرنس عادي
      
      return true;
    }),
  ...createReferenceValidation,

  validationMiddleware,
];
