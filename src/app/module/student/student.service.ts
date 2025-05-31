import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};


const updateStudentIntoDB = async (id: string, payload:Partial<TStudent>) => {

  const {name, guardian, localGuardian, ...remainingStudentData} = payload

  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData
  }

  if(name && Object.keys(name).length){
    for (const [key, value] of Object.entries(name)){
      modifiedStudentData[`name.${key}`] = value;
      console.log(modifiedStudentData[`name.${key}`] = value);
    }
  }


  console.log(modifiedStudentData);
  if(guardian && Object.keys(guardian).length){
    for (const [key, value] of Object.entries(guardian)){
      modifiedStudentData[`guardian.${key}`] = value;
      console.log(modifiedStudentData[`guardian.${key}`] = value);
    }
  }
  console.log(modifiedStudentData);


  if(localGuardian && Object.keys(localGuardian).length){
    for (const [key, value] of Object.entries(localGuardian)){
      modifiedStudentData[`localGuardian.${key}`] = value;
      console.log(modifiedStudentData[`localGuardian.${key}`] = value);
    }
  }
  console.log(modifiedStudentData);

  const result = await Student.findOneAndUpdate({ id }, modifiedStudentData, {new:true, runValidators:true})
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};



const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession()

    return deletedStudent;

  } catch (error) {

    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student');

  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
