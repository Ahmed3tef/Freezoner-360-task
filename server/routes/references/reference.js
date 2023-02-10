import { Router } from 'express';

import {
  createReferenceFile,
  getAllReferences,
  getReference,
  createReference,
  updateReference,
  deleteReference,
  createFilterObjForNested,
  getSearchReferences,
} from '../../controllers/references/reference.js';

import {
  createReferenceValidation,
  deleteReferenceValidation,
  getReferenceValidation,
  getSearchReferenceValidation,
  updateReferenceValidation,
} from '../../utils/validations/references/references.js';

const router = Router({ mergeParams: true });

router.get('/', createFilterObjForNested, getAllReferences);
router.get('/search', getSearchReferenceValidation,createFilterObjForNested, getSearchReferences);

// router.use(tokenProtection);

router
  .route('/one/:id')
  .get(getReferenceValidation, getReference)
  .patch(
    // accessAllowedTo('user'),
    updateReferenceValidation,
    updateReference
  )
  .delete(
    // accessAllowedTo('admin', 'user'),
    deleteReferenceValidation,
    deleteReference
  );

router.post(
  '/create',
  // accessAllowedTo('user'),
  createReferenceFile,
  createReferenceValidation,
  createReference
);

export default router;
