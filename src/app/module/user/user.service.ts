import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createStudentIntoDB = async (password:string, studentData: TStudent) => {

    const userData: Partial<TUser> ={}

    userData.password = password || config.default_password as string
    console.log(userData.password);
    userData.role='student'


    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester);
    console.log(admissionSemester);

    userData.id = await generateStudentId(admissionSemester as TAcademicSemester);


  const session = await mongoose.startSession();


  try {

    session.startTransaction();

    const newUser = await User.create([userData], {session});

    if(!newUser.length){
      throw new AppError(httpStatus.BAD_GATEWAY, 'failed to create new user')
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id // reference _id

    const newStudent = await Student.create([studentData], {session});

    if(!newStudent){
      throw new AppError(httpStatus.BAD_GATEWAY, 'failed to create new student');
    }

    await session.commitTransaction();
    await session.endSession()

    return newStudent;
  
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('failed to create student')
  }
  
};

export const UserService = {
    createStudentIntoDB
}