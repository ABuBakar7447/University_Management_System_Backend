import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'first name cannot be more than 20 characters')
    .nonempty('firstName is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().nonempty('lastName is required'),
});


const guardianSchema = z.object({
  fatherName: z.string().nonempty('fatherName is required'),
  fatherOccupation: z.string().nonempty('fatherOccupation is required'),
  fatherContactNo: z.string().nonempty('fatherContactNo is required'),
  motherName: z.string().nonempty('motherName is required'),
  motherOccupation: z.string().nonempty('motherOccupation is required'),
  motherContactNo: z.string().nonempty('motherContactNo is required'),
});


const localGuardianSchema = z.object({
  name: z.string().nonempty('name is required'),
  occupation: z.string().nonempty('occupation is required'),
  contactNo: z.string().nonempty('contactNo is required'),
  address: z.string().nonempty('address is required'),
});


const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      id: z.string().nonempty('id is required'),
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'gender is not valid' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email('email must be a valid email address'),
      contactNo: z.string().nonempty('contactNo is required'),
      emergencyContactNo: z.string().nonempty('emergencyContactNo is required'),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'bloogGroup is not valid' }),
      }),
      presentAddress: z.string().nonempty('presentAddress is required'),
      permanentAddres: z.string().nonempty('permanentAddres is required'),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().url('profileImg must be a valid URL').optional(),
      academicDepartment:z.string(),
      admissionSemester: z.string()
    }),
  }),
});






const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});








export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
