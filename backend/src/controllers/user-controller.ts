import User from "../models/User.js";
import { NextFunction, Request,Response } from "express";
import {hash, compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
    ) =>{

    try {
         //get all users
        const users = await User.find();
        return res.status(200).json({message: "OK",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction,

    ) =>{

    try {
         //user signup
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(401).send("User already registerd");
        const hashedPassword = await hash(password,10);
        const user = new User({name, email, password: hashedPassword})
        await user.save();

        //
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            secure: true,       // Ensure the same settings as when setting the cookie
            sameSite: 'none',   // Important for cross-origin cookies
             path: '/',          // Ensure it matches the path used when the cookie was set


        });
        //
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        //expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token, {
            httpOnly: true,           // Prevent JavaScript access
            secure: true,             // Ensure cookies are sent over HTTPS
            sameSite: 'none',         // Allow cross-origin requests
            path: '/',                // Valid for all routes
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
        });

        return res.status(201).json({message: "OK", name: user.name, email:user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,

    ) =>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }
    
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME,token, {
            httpOnly: true,
            secure: true, // Disable for development
             sameSite: 'none', // Allows normal cookie behavior
             path: '/',
             expires,
             signed: true
            
        });
        
        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction,

    ) =>{

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        
        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}

export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction,

    ) =>{

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            secure: true,       // Ensure the same settings as when setting the cookie
            sameSite: 'none',   // Important for cross-origin cookies
             path: '/',          // Ensure it matches the path used when the cookie was set

        });
        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}