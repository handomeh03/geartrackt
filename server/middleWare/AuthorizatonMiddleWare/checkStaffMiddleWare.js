import { User } from "../../models/UserModel.js";

export async function checkStaffMiddleWare(req, res, next) {
  let {id} = req.user;
  try {
    let user=await User.findById(id);

    if(!user){
      return res.status(401).send({error:"user not found"});
    }

    if (user.role !="staff") {
    return res.status(401).send({ error: "you are not authorized " });
    }
  next();
    
  } catch (error) {
    return req.status(500).send({error:error.message})
  }
  
}
