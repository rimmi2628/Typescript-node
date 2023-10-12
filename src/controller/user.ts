import express,{Request,Response} from 'express';

import usermodel, { UserDocument } from '../models/register';


import * as ItemService from '../services/user';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { FilterQuery } from 'mongoose';



// import {createuser,finduser,updateuser} from '../services/user'

// const user= async(req:Request,res:Response)=>{

//       try {

//         res.status(200).json("hello")
        
//       } catch (error) {
//         res.status(400).json(error);
//       }

// }

// export{
//     user
// }




// const userdetail = async (req: Request, res: Response) => {
//     try {
  
  
//           const { name, email } = req.body;

//         // Assuming createuser is an async function that expects name and email as arguments
//         const userdetailsd = await user({
//             name,
//             email
//         });
//         res.status(200).json({ data: userdetailsd });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export {
//     userdetail
// };


// export async function createItem(req: Request, res: Response) {
//   try {
//   //  console.log(req.body.name);
   
//     const newItem = await ItemService.createItem(req.body);
//     console.log("bjhjhjk",newItem)
//     res.json(newItem);
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }


export async function userCreate(req:Request,res:Response){

  try {

    const emailExists = await usermodel.findOne({ email: req.body.email });
   

    // Log the result to the console

    if (emailExists) {
      return res.status(400).json({ msg: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userRegis= await ItemService.register( {...req.body,password:hashedPassword})
    res.status(200).json({data:userRegis});


    // const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // const usereg=await usermodel.create({...req.body,password:hashedPassword});
    // console.log(usereg);
  } catch (error) {
    res.status(500).json(error);
  }
}



export async function login(req:Request,res:Response){
  try {

const user=await usermodel.findOne({email:req.body.email});

if(user){

const match=  await bcrypt.compare(req.body.password,user.password);
if(match){
const payload={
  email:req.body.email
}
const secretkey="bjkdeiowejfr8eryughugh"

const jwttoken=jwt.sign(payload,secretkey)

  return res.status(200).json({msg:"user login succesfully",token:jwttoken})
}
else{
  return res.status(500).json("invalid credentials")
}


}else{
  return res.send(400).json("user not found");
}
}
    
   catch (error) {
    res.status(500).json(error)
  }
}


// export async function finduser(req:Request,res:Response){
//   try {

//     const user=await usermodel.find();
//     res.status(200).json({data:user});
    
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }

export async function finduser(req:Request,res:Response){
  try {

    const user=await ItemService.findUser();
    res.status(200).json({data:user});
    
  } catch (error) {
    res.status(400).json(error);
  }
}


export async function finduserbyid(req:Request,res:Response){
  try {

    const user=await ItemService.findUserByid(req.body.id);
    res.status(200).json({data:user});
    
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function finduserbyidandupdate(req:Request,res:Response){
  try {

    const user_id = req.body.user_id; // Assuming user_id is passed in the request body
    const updateData = req.body;
    if(user_id){
    const user=await ItemService.updateUser(user_id, updateData);
    if(user){
   return  res.status(200).json({msg:"user update succesfuuly"});
    }else{
      return  res.status(200).json({msg:"user not update succesfuuly"});
    }
    }else{
      return res.status(200).json({"msg":"user not found"});
    }
  } catch (error) {
    res.status(400).json(error);
  }
}


export async function filter(req:Request,res:Response){
  try {

    const keyword = req.body.keyword; // Assuming user_id is passed in the request body
    const regexPattern = new RegExp(`^${keyword}|${keyword}$`, 'i');

    const filterCriteria: FilterQuery<UserDocument> = {
      $or: [
        { name: { $regex: regexPattern } },
        { email: { $regex: regexPattern } },
        // Add more fields as needed
      ],
    };
   
    const dat=await ItemService.filterUser(filterCriteria);
    res.status(200).json({data:dat})
   
  } catch (error) {
    res.status(400).json(error);
  }
}
// import { Request, Response } from 'express';
// import { Role, RoleInput } from '../models/user';

// const createRole = async (req: Request, res: Response) => {
//   const {  name } = req.body;

//   if (!name) {
//     return res.status(422).json({
//       message: 'The fields name and description are required',
//     });
//   }

//   const roleInput: RoleInput = {
//     name,
 
//   };

//   const roleCreated = await Role.create(roleInput);
//   console.log(roleCreated);

//   return res.status(201).json({ data: roleCreated });
// };

// export { createRole };