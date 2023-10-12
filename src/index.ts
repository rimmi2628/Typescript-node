import express,{Request,Response} from 'express';

import mongoose  ,{ ConnectOptions } from 'mongoose';

import {router} from './routes/router';

const app=express();


const port=process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(router);

// app.get('/',(req:Request,res:Response):void=>{
//     res.status(200).json("MY name is Rimzim")
// })


// const connectionString = "mongodb://localhost:27017/nodets";

//  mongoose.createConnection(connectionString);

mongoose.connect('mongodb://127.0.01:27017/nodets');

app.listen(port ,():void=>{
 console.log(`server is running on this port ${port}`);
})







