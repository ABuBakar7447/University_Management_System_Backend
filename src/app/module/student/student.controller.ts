import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';



const getAllStudents = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
      statusCode:200,
      success:true,
      message:'Students are retrived successfully',
      data:result
  })

});

const getSingleStudent = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
 
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
      statusCode:200,
      success:true,
      message:'Student is retrieved succesfully',
      data:result
  })

});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
      statusCode:httpStatus.OK,
      success:true,
      message:'Student is deleted succesfully',
      data:result
  })
  
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};
