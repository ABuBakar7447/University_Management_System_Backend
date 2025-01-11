import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentIntoDB = async (password:string, studentData: TStudent) => {

    const userData: Partial<TUser> ={}
    userData.password = password || config.default_password
    console.log(userData.password);
    userData.role='student'

    
    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester);
    console.log(admissionSemester);

    userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

    // userData.id = '10011'
    
   
    // if(await Student.isUserExists(studentData.id)){
    //     throw new Error('user already exist')
    // }
  const result = await User.create(userData);

  if(Object.keys(result).length){
    studentData.id = result.id;
    studentData.user = result._id // reference _id

    const newStudent = await Student.create(studentData);
    return newStudent
  }
  return result;
};

export const UserService = {
    createStudentIntoDB
}