import { Router } from 'express';

import {
  addSuggestion,
  getCategorySuggestion,
  getCategorySuggestions,
  removeSuggestion,
} from '../../controllers/references/suggestion.js';

import {
  createSuggestionValidation,
  deleteSuggestionValidation,
  getCategorySuggestionValidation,
  getSuggestionValidation,
} from '../../utils/validations/references/suggestion.js';

const router = Router();

// must be valid logged in user and only user can access this route
// router.use(tokenProtection, accessAllowedTo('user'));

// should be added by normal user
router.route('/').get(getCategorySuggestionValidation, getCategorySuggestions);

router.post('/create', createSuggestionValidation, addSuggestion);

router.get('/:suggestionId', getSuggestionValidation, getCategorySuggestion);
// should be delteted only by admin or user
router.delete('/:suggestionId', deleteSuggestionValidation, removeSuggestion);

export default router;
