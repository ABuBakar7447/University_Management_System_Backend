import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";


const academicDepartScehma = new Schema<TAcademicDepartment>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty'
    }
},
{
    timestamps:true
}
)

academicDepartScehma.pre('save', async function(next){
    const isDepartmentExist = await AcademiDepartment.findOne({
        name : this.name,
    })

    if(isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND, 'This department is already exist')
    }

    next()
})

academicDepartScehma.pre('findOneAndUpdate', async function (next){
    const query = this.getQuery(); //use console.log(this.getQuery() to better understand)

    const isDepartmentExist = await AcademiDepartment.findOne(query);

    if(!isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND, 'This department doest not exist')
    }

    next()
})

export const AcademiDepartment = model<TAcademicDepartment>('AcademicDepartment',academicDepartScehma)