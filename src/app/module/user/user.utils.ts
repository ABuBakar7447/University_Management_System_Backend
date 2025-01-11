import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const lastEnrolledUser = async(year:string, code:string)=>{

    const result = await User.findOne(
        {

        role: 'student',
        // id: new RegExp(`^${year}${code}`),
        id:{$regex: `^${year}${code}`}

        },
        {
            id:1,
            _id:0
        }).sort({createdAt:-1}).lean()


        return result?.id? result.id : undefined
}

export const generateStudentId = async(payload: Partial<TAcademicSemester>) =>{

    let currentId =  (0).toString();

    const lastuserId = await lastEnrolledUser(payload.year as string, payload.code as string)
    const lastUserSemesterYear = lastuserId?.substring(0,4);
    const lastUserSemesterCode = lastuserId?.substring(4,6);

    const currentUserSemesterCode = payload.code
    const currentUserSemesterYear = payload.year

    if(lastuserId && lastUserSemesterYear === currentUserSemesterYear && lastUserSemesterCode === currentUserSemesterCode){
        currentId = lastuserId.substring(6)
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `${payload.year}${payload.code}${incrementId}`;

    return incrementId;

  
}