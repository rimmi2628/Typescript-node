import { Schema,Document,model} from "mongoose";


export interface UserDocument extends Document{
    name:string,
    email:string,
    contact:string,
    password:string
}

// interface user{

//     name:string,
//     email:string
// }

const schema= new Schema({

    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    contact:{
        type:String,
        require:true,
        
        validate: {
            validator: (contact:string) => contact.length >= 10,
            message: 'Contact must be at least 10 characters long',
          },
    },
    password:{
        type:String,
        require:true,
        
        
    }
})

const usermodel=model<UserDocument>('User',schema)
export default usermodel



// import mongoose, { Schema, Model, Document } from 'mongoose';

// type RoleDocument = Document & {
//   name: string;

// };

// type RoleInput = {
//   name: RoleDocument['name'];

// };

// const roleSchema = new Schema(
//   {
//     name: {
//       type: Schema.Types.String,
//       required: true,
//       unique: true,
//     }
    
//   },
//   {
//     collection: 'roles',
//     timestamps: true,
//   },
// );

// const Role: Model<RoleDocument> = mongoose.model<RoleDocument>('Role', roleSchema);

// export { Role, RoleInput, RoleDocument };