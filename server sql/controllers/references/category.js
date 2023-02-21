import { ReferenceCategoryModel } from '../../models/references/category.js';

import {
  createHandler,
  deleteHandler,
  getAllHandler,
  getOneHandler,
  updateHandler,
} from '../crud-handlers.js';

// get all cats
export const getAllCategories = getAllHandler(ReferenceCategoryModel);

// get one cat
export const getCategory = getOneHandler(ReferenceCategoryModel, 'Category');

export const createCategory = createHandler(ReferenceCategoryModel);

// update cat

export const updateCategory = updateHandler(ReferenceCategoryModel, 'Category');

// update cat

export const deleteCategory = deleteHandler(ReferenceCategoryModel, 'Category');
