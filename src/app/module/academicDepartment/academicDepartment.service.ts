import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademiDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = async(payload:TAcademicDepartment)=>{
    const result = await AcademiDepartment.create(payload)
    return result;
}

const getAllAcademicDepartmentFromDB = async()=>{
    const result = await AcademiDepartment.find().populate('academicFaculty');
    return result;
}

const getSingleAcademicDepartmentFromDB = async(id:string)=>{
    const result = await AcademiDepartment.findOne({_id:id}).populate('academicFaculty');

    if(!result){
        throw new AppError(httpStatus.NOT_FOUND, 'no matches result found')
    }
    return result;
}


const updateAcademicDepartmentIntoDB = async(id:string, payload:Partial<TAcademicDepartment>)=>{
    const result = await AcademiDepartment.findOneAndUpdate({_id:id}, payload, {new:true});
    return result;
}


export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
}