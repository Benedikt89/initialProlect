import mongoose, {DocumentQuery} from "mongoose";
import User, {I_mongooseUser} from './models/User';
import {I_userFullInfoType} from "../../../../core/users-types";
import {I_loginResponce} from "../users-router";
import {ENV_URL} from "../../config";


export const usersRepository = {
    async addUser(user: I_userFullInfoType): Promise<I_loginResponce | never> {
        try {
            const newUser = new User({
                id: new mongoose.Types.ObjectId(),
                email: user.email,
                password: user.password,
                photo: user.photo,
                birth_date: user.birth_date,
                createdAt: user.createdAt,
                firstName: user.firstName,
                lastName: user.lastName,
            });
            let doc = await newUser.save();
            return new Promise(((resolve, reject) => resolve
            ({
                id: doc.id,
                email: doc.email,
                photo: `${ENV_URL + doc.photo}`,
                birth_date: doc.birth_date,
                createdAt: doc.createdAt,
                firstName: doc.firstName,
                lastName: doc.lastName,
            })))
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },
    async getUser(userEmail: string): Promise<I_mongooseUser | never>  {
        try {
            let doc = await User.find({email: userEmail});
            return new Promise((resolve, reject) => {
                resolve(
                    {
                        id: doc.id,
                        email: doc.email,
                        photo: `${ENV_URL + doc.photo}`,
                        birth_date: doc.birth_date,
                        createdAt: doc.createdAt,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                    }
                )
            })
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    async updateUser(newUserInfo: I_userFullInfoType): Promise<I_userFullInfoType> {
        try {
            return await User.update({_id: newUserInfo.id}, newUserInfo)
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },

    async deleteUser(userId: string): Promise<any> {
        try {
            return User.deleteOne({_id: userId});
        } catch (err) {
            console.warn(JSON.parse(JSON.stringify(err)));
            throw err;
        }
    },
};