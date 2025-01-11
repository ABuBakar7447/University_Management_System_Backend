/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser>({
    id:{type:String, required:true, unique:true},
    password:{type:String, required:true, maxlength:[20, 'password can not be more than 20']},
    needsPasswordChange:{type:Boolean,default:true},
    role:{type:String, enum:{values:['admin', 'student', 'faculty'], message:'{VALUE is not valid role}'}},
    status:{type:String, enum:{values:['in-progress', 'blocked'], default:'in-progress', message:'{VALUE is not valid role}'}},
    isDeleted:{type:Boolean, default:false}

},
{
    timestamps:true
})


userSchema.pre('save', async function (next) {
    // console.log(this, 'before save');
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round));
    next();
})

userSchema.post('save', function (doc, next) {
    // console.log(doc, 'after save');
    doc.password = '';
    next()
    
})

export const User = model<TUser>('User', userSchema)