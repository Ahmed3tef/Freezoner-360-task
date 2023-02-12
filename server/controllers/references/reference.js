import { ReferenceModel } from '../../models/references/reference.js';
import asyncHandler from 'express-async-handler';

import {
  createHandler,
  deleteHandler,
  getAllHandler,
  getOneHandler,
  updateHandler,
} from '../crud-handlers.js';

import { uploadSingleFile } from '../../middlewares/uploadFiles.js';
import { ReferenceCategoryModel } from '../../models/references/category.js';
import ApiError from '../../utils/ApiError.js';

// upload single image
export const createReferenceFile = uploadSingleFile('references', 'file');

// nested route
// GET categories/:categoryId/references/
export const createFilterObjForNested = async (req, res, next) => {
  if (req.params.categoryId) {
    const category = await ReferenceCategoryModel.findById(
      req.params.categoryId
    );

    if (!category)
      return next(new ApiError('No category found for this id', 404));

    let filterObj = { categoryId: req.params.categoryId };
    req.filterObj = filterObj;
  }
  next();
};

// nested route (create)
// export const setProductIdAndUserId = (req, res, next) => {
//   // so you don't have to worry about userId and categoryId

//   if (req.params.categoryId) {
//     if (!req.body.categoryId) req.body.categoryId = req.params.categoryId;
//     if (!req.body.user) req.body.user = req.user._id;
//   }
//   next();
// };

// get all References
export const getAllReferences = getAllHandler(ReferenceModel);


// get one Reference
export const getReference = getOneHandler(ReferenceModel, 'Reference');

// create Reference
export const createReference = createHandler(ReferenceModel);

// update Reference

export const updateReference = updateHandler(ReferenceModel, 'Reference');

// update Reference

export const deleteReference = deleteHandler(ReferenceModel, 'Reference');



// get all References with search 
export const getSearchReferences = asyncHandler(async (req, res, next) => {
  // i need to select category to search in
  const { categoryId } = req.params
  console.log(categoryId)
  const { keyword } = req.query
  ReferenceModel.find({
    categoryId,
   $or: [
        { title: { "$regex": keyword, "$options": 'i' } },
        { description: { "$regex": keyword, "$options": 'i' } },
        { author: { "$regex": keyword, "$options": 'i' } },
        { reviewer: { "$regex": keyword, "$options": 'i' } },
      ]
 }).then(list =>  res.status(200).json({ status: 'success', data: list}))
})