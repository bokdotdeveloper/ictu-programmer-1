import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
//import { configureOpenAI } from "../config/openai-config.js";
//import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

import { Configuration, OpenAIApi,ChatCompletionRequestMessage } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configureOpenAI = () => {
    return new Configuration({
        apiKey: process.env.OPEN_AI_SECRET, // Make sure this is defined in your environment variables
    });
};

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);

        if (!user) {
            return res.status(401).json({ message: "User not Registered" });
        }

        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        const config = configureOpenAI(); // Includes the API key
        const openai = new OpenAIApi(config);

        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });

        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error(error.response?.data || error.message);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

export const sendChatsToUser = async (
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

        return res.status(200).json({message: "OK", chats: user.chats});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}


export const deleteChats = async (
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
        //@ts-ignore
        user.chats = [];
        await user.save();

        return res.status(200).json({message: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
   
}



/** 
export const generateChatCompletion = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
    const {message} = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);

            if(!user)
            return res.status(401).json({message: "User not Registered"});
            //grab chats of user
            const chats = user.chats.map(({role, content})=>({role, content})) as ChatCompletionRequestMessage[];
            chats.push({content: message, role: "user"});
            user.chats.push({content: message, role: "user"});
            //send all chats with new one to Open AI
            const config = configureOpenAI();
            const openai = new OpenAIApi(config);

            const chatResponse = await openai.createChatCompletion({
                model: "gpt-4o-mini",
                messages: chats,
            });
            user.chats.push(chatResponse.data.choices[0].message);
            await user.save();

            return res.status(200).json({chats: user.chats});
            //get latest response
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something Went Wrong"});
        
    }
    

}
*/



