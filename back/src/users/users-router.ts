import {usersRepository} from "./dal/users-repository";

import express, {NextFunction, Request, Response} from "express";
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {upload} from "./dal/ImageHolder";
import * as fs from "fs";
import {rootPath} from "../config";
const checkAuth = require("./middleware/check-auth");

export interface I_loginResponce {
    id: string,
    photo?: string,
    birth_date?: Date,
    createdAt?: Date,
    firstName?: string,
    lastName?: string,
    email: string,
}

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        let userFind = await usersRepository.getUser(user.email);
        if (userFind.length < 1)
            return res.status(401).json({
                message: 'email or password not correct'
            });
        const compared = await bcrypt.compare(user.password, userFind[0].password);
        if (!compared) {
            return res.status(401).json({
                message: 'email or password not correct'
            });
        }
        if (compared) {
            // @ts-ignore
            req.session.user_id = userFind[0].id;

            const token = jwt.sign({
                    email: userFind[0].email,
                    userId: userFind[0].id
                },
                // @ts-ignore
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                },
            );
            res.cookie("x-access-token" , token, {maxAge: 9999999, sameSite: 'None'});
            return res.status(200).json({
                message: 'Auth Successful',
                userInfo: {
                    userName: userFind[0].email,
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.delete('/logout', (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("x-access-token");
    res.clearCookie("_csrf");
    res.clearCookie("BENS_TOKEN");
    res.send("success");
});

router.post(`/`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        let userFind = await usersRepository.getUser(user.email);
        // @ts-ignore
        if (!userFind.length >= 1) {
            const newUser = await usersRepository.addUser(user);
            console.log(newUser);
            res.send(newUser).status(201)
        } else {
            return res.status(409).json({message: "This Email Already Used"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.put('/', checkAuth,
    async (req: Request, res: Response) => {
        try {
            let newUserInfo = req.body;
            newUserInfo.photo = newUserInfo.photo.slice(22, newUserInfo.photo.length);
            let updated = await usersRepository.updateUser(newUserInfo);
            res.status(200).send(updated)
        } catch (err) {
            res.status(402).send(err)
        }
    });

router.delete('/:email', checkAuth,
    async (req: Request, res: Response) => {
        try {
            const userEmail = req.params.email;
            let founded = await usersRepository.getUserInfo(userEmail);

            if (founded.photo !== 'noPhoto') {
                fs.unlink(rootPath + `${founded.photo}`, (err) => {
                    if (err)
                        throw err;
                    console.log(`${founded.photo} was deleted`);
                });
            }
            usersRepository.deleteUser(userEmail);

            return res.status(204).send(founded)
        } catch (err) {
            return res.status(400).send(err);
        }
    });

router.put('/edit', checkAuth, upload.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //checking file
            const file = req.file;
            if (!file) {
                const error: any = new Error('Please upload a file');
                error.status = 400;
                return next(error)
            }

            let newUserData = {...req.body, photo: file.path.replace(/\\+/g, "/")};
            let result = await usersRepository.addUser(newUserData);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    });

export default router;