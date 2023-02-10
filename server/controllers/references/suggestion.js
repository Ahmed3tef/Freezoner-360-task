import asyncHandler from 'express-async-handler';

import { ReferenceCategoryModel } from '../../models/references/category.js';

export const addSuggestion = asyncHandler(async (req, res, next) => {
  // $addToSet => add Suggestion to suggestions only if Suggestion does not exist.

  req.body.date = new Date().toISOString();

  const category = await ReferenceCategoryModel.findByIdAndUpdate(
    req.query.categoryId,
    {
      $addToSet: { suggestions: req.body },
    },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    message: 'Suggestion successfully added to your suggestions.',
    data: category.suggestions,
  });
});

export const removeSuggestion = asyncHandler(async (req, res, next) => {
  // $pull => add Suggestion to suggestions only if Suggestion does not exist.
  const category = await ReferenceCategoryModel.findByIdAndUpdate(
    req.query.categoryId,
    {
      $pull: { suggestions: { _id: req.params.suggestionId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Suggestion successfully removed from your suggestions.',
    data: category.suggestions,
  });
});

export const getCategorySuggestions = asyncHandler(async (req, res, next) => {
  // $pull => add Suggestion to suggestions only if Suggestion does not exist.
  const category = await ReferenceCategoryModel.findById(
    req.query.categoryId
  ).populate('suggestions');

  res.status(200).json({
    status: 'success',
    results: category.suggestions.length,
    data: category.suggestions,
  });
});
