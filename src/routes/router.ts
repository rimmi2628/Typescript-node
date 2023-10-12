import express ,{Request,Response} from 'express';

import * as ItemController from '../controller/user';
const router=express.Router();



router.post('/',ItemController.userCreate);

router.get('/login',ItemController.login);
router.get("/user",ItemController.finduser);

router.get("/getuser",ItemController.finduserbyid)
router.post("/updateuser",ItemController.finduserbyidandupdate)

router.get("/filteruser",ItemController.filter)



export{
    router
}

// import express ,{Request,Response} from 'express';
// import { createRole } from '../controller/user';
// const router=express.Router();

// router.post('/', createRole);

// export{
//     router
// }