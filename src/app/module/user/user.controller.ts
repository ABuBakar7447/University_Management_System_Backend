import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
// import { HttpStatus } from "http-status-ts";

const createStudent = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
  
  const {password, student: studentData } = req.body;

  // const zodParseData = studentValidationSchema.parse(studentData);

  const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
      statusCode:200,
      success:true,
      message:'Students are retrived successfully',
      data:result
  })
  
})

export const UserController = {
    createStudent
}
