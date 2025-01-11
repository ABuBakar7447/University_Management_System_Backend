/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
    StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim:true,
    maxlength:[20, 'first name can not be more than 20 characters'],
    required: [true, 'firstName is required']
  },
  middleName: {
    type: String,
    trim:true
  },
  lastName: {
    type: String,
    trim:true,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required:  [true, 'fatherName is required']
  },
  fatherOccupation: {
    type: String,
    required:  [true, 'fatherOccupation is required']
  },
  fatherContactNo: {
    type: String,
    required:  [true, 'fatherContactNo is required']
  },
  motherName: {
    type: String,
    required:  [true, 'motherName is required']
  },
  motherOccupation: {
    type: String,
    required:  [true, 'motherOccupation is required']
  },
  motherContactNo: {
    type: String,
    required:  [true, 'motherContactno is required']
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  occupation: {
    type: String,
    required: [true, 'occupation is required']
  },
  contactNo: {
    type: String,
    required: [true, 'contactNo is required']
  },
  address: {
    type: String,
    required: [true,'address is required']
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, require:true, unique:true },
  user:{type:Schema.Types.ObjectId, required:[true, 'user id is required'], unique:true, ref:'User'},
  name:{
    type:userNameSchema,
    required:[true, 'Name is require']
  },
  gender: {
    type:String,
    enum:{values:['male', 'female','other'], message:'{VALUE} is not valid'},
    required:true
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup:{
    type:String,
    enum:{values:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], message:'{VALUE} is not valid'}
  }, 
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required:true
  },
  localGuardian: {
    type: localGuradianSchema,
    required:true
  },
  profileImg: { type: String },
  admissionSemester:{type:Schema.Types.ObjectId, ref:'AcademicSemester'},
  isDeleted:{type:Boolean, default:false}
},{
    toJSON:{
        virtuals:true
    }
});

studentSchema.virtual('fullName').get(function(){
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})



studentSchema.pre('find', function (next) {
    this.find({ isDeleted:{ $eq:false }})
    next();
})

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted:{ $eq:false }})
    next();
})

studentSchema.pre('aggregate', function(next){
    this.pipeline().unshift({ $match: { isDeleted: { $eq : false }}})
    next()
})


// creating a custom static method
studentSchema.statics.isUserExists = async function (id:string) {
    const existingUser = await Student.findOne({id});
    return existingUser
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
