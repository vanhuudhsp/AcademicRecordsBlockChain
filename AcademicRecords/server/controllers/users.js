import { createUserFabric } from "../fabric/index.js";
import { UserModel } from "../models/UserModel.js";
import crypto from 'crypto';

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        //console.log('users', users);
        res.status(200).json(users);

    } catch (error) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

export const createUser = async (req, res) => {
    try {
        
        const {userLogin,newUser} = req.body;
        //console.log("[Server-userLogin]",userLogin);
        //console.log("[Server-newUser]",newUser);
        newUser.password = crypto.createHash('md5').update(newUser.password).digest('hex');
        await createUserFabric(userLogin,newUser);
        const user = new UserModel(newUser);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

export const updateUser = async (req, res) => {
    try {
        const updateUser = req.body;
        
        const user = await UserModel.findOneAndUpdate({_id: updateUser._id}, updateUser, {new: true});
        
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};


export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email,password );
        const user = await UserModel.findOne({email: email, password: crypto.createHash('md5').update(password).digest('hex')});
        //console.log('[ email ]', email);
        //console.log('[ password ]', password);
        console.log( crypto.createHash('md5').update(password).digest('hex'));

        res.status(200).json((user));

    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};