import mongoose, {Schema, Document, Model} from "mongoose";
import bcrypt from 'bcryptjs';
import {I_loginInfo} from "../../../../../core/users-types";


export interface I_mongooseUser extends I_loginInfo, Document {
    id: string,
    photo?: string,
    birth_date?: Date,
    createdAt?: Date,
    firstName?: string,
    lastName?: string,
}

const userSchema:Schema = new Schema({
    email: {type: String, required: true, unique: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    createdAt: {type: Date, required: true},
    photo: {type: String},
    birth_date: {type: Date},
});

//adding methods to schema
userSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

// hash user password before saving into database and add date
userSchema.pre('save', function(next:any){
    let now = new Date();

    // @ts-ignore
    if (!this.createdAt) {this.createdAt = now;}

    // @ts-ignore
    this.password =  bcrypt.hashSync(this.password, 10);
    next();
});

const User:Model<I_mongooseUser> = mongoose.model('users', userSchema);

export default User