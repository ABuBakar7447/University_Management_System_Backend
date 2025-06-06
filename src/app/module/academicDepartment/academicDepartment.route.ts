import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidation), AcademicDepartmentController.createAcademicDepartment);

router.get(
    '/:departmentId',
    AcademicDepartmentController.getSingleAcademicDepartment,
  );
  
  router.patch(
    '/:departmentId',
    validateRequest(
      AcademicDepartmentValidation.updateAcademicDepartmentValidation,
    ),
    AcademicDepartmentController.updateAcademicDepartment
  );
  
  router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;