import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async(req, res)=>{
    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is created succesfully',
        data: result,
      });
})


const getAllAcademicDepartment = catchAsync(async(req, res)=>{
    const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved all academic department successfully',
        data: result,
      });
})


const getSingleAcademicDepartment = catchAsync(async(req, res)=>{
    const {departmentId} = req.params;
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrieved academic department successfully',
        data: result,
      });
})

const updateAcademicDepartment = catchAsync(async(req, res)=>{
    const {departmentId} = req.params;
    const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(departmentId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department updated succesfully',
        data: result,
      });
})


export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}