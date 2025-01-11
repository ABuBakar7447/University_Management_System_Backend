import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
  );

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
