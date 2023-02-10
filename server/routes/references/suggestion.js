import { Router } from 'express';

import {
  addSuggestion,
  getCategorySuggestions,
  removeSuggestion,
} from '../../controllers/references/suggestion.js';

import {
  createSuggestionValidation,
  deleteSuggestionValidation,
  getCategorySuggestionValidation,
} from '../../utils/validations/references/suggestion.js';

const router = Router();

// must be valid logged in user and only user can access this route
// router.use(tokenProtection, accessAllowedTo('user'));

// should be added by normal user
router.route('/').get(getCategorySuggestionValidation, getCategorySuggestions);

router.post('/create', createSuggestionValidation, addSuggestion);

// should be delteted only by admin or user
router.delete('/:suggestionId', deleteSuggestionValidation, removeSuggestion);

export default router;
