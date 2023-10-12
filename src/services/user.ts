// import {PopulatedDoc,FilterQuery,QueryOptions,UpdateQuery } from "mongoose";

import { FilterQuery } from 'mongoose';
import usermodel,{UserDocument} from '../models/register';




// export function createuser(input:PopulatedDoc<UserDocument>){
//     return usermodel.create(input)
// }

// export function finduser(query:FilterQuery<UserDocument>,options:QueryOptions={lean:true}){
//     return usermodel.find(query,{},options);
// }


// export function updateuser(query:FilterQuery<UserDocument>,update:UpdateQuery<UserDocument>,options:QueryOptions){
//     return usermodel.findOneAndUpdate(query,update,options);
// }

// export async function createItem(userData:UserDocument ): Promise<UserDocument> {
//     try {
//       const newItem = new usermodel(userData);
//       console.log(newItem)
//       return await newItem.save();
//     } catch (error) {
//       throw error;
//     }
//   }


export async function register(userRegister:UserDocument): Promise<UserDocument>{

  try{
    // const userreg=new usermodel(userRegister);
    // return await userreg.save()

    const userreg=await  usermodel.create(userRegister);
    return userreg.save()
  }catch(error){
   throw error;
  }

}



export async function findUser(): Promise<UserDocument[]>{

  try{
    const userdata= await usermodel.find({});
    return userdata;
  }catch(error){
   throw error;
  }

}


export async function findUserByid(filter:UserDocument): Promise<UserDocument | null>{

  try{
    const userdataid= await usermodel.findById(filter);
    return userdataid;
  }catch(error){
   throw error;
  }

}


export async function updateUser(user_id:UserDocument ,update:UserDocument):Promise<UserDocument |null>{
  try {

    const updauser= await usermodel.findByIdAndUpdate(user_id,update);
    return updauser;
    
  } catch (error) {
    throw error
  }
}


export async function filterUser(filterCriteria: FilterQuery<UserDocument>): Promise<UserDocument[]> {
  try {
    const filteredUsers = await usermodel.find(filterCriteria);

    return filteredUsers;
  } catch (error) {
    throw error;
  }
}
