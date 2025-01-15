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

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
            expires,
           
          });
    
        const token = createToken(user._id.toString(), user.email, "7d");
       
        res.cookie(COOKIE_NAME,token, {
            httpOnly: true,
            secure: true, // Disable for development
             sameSite: 'none', // Allows normal cookie behavior
             path: '/',
             expires,
             signed: true,
            
            
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

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
            expires,
           
          });
    
        const token = createToken(user._id.toString(), user.email, "7d");
       
        res.cookie(COOKIE_NAME,token, {
            httpOnly: true,
            secure: true, // Disable for development
             sameSite: 'none', // Allows normal cookie behavior
             path: '/',
             expires,
             signed: true,
            
            
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
            signed: true,
            path: "/",
            
           
          });
        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}