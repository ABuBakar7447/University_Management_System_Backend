import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academSemester.service";



const createAcademicSemester = catchAsync(async(req, res)=>{

    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body)


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic Semester created successfully',
        data:result 
    })
})


const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });


  const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });
  
  


export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
}