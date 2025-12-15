import { User } from "../models/UserModel.js";
import bcrypte from "bcrypt";
import { createToken } from "../utils/token/createtoken.js";
import { AuditLog } from "../models/auditLog.js";

//for register
export async function register(req,res) {
    let {fullName,email,password}=req.body;
    //check the input use registerValidation middleWare

    try {

    // check if user is in database
     let userfind =await User.findOne({email});
     if(userfind){
      return  res.status(400).send({error:"user already exist"});
     }

     // to hash the password
     let salt=await bcrypte.genSalt(10);
     let hashPassword=await bcrypte.hash(password,salt);

    //generate user and store in database
     const newUser={fullName,email,password:hashPassword};
     const user=await User.create(newUser);

     // generate token and send as respone
     const token =createToken(user._id);


    return res.status(201).send({token});

    } catch (error) {
      return  res.status(500).send({error:error.message });
    }
    
    
}
//for login
export async function login(req,res) {
    let{email,password}=req.body;
    // validate the input using login middleWare

    try {
        
        //check if email is exist in database
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send({error:"user not found"});
        }

        //check if the password is correct
        const match=await bcrypte.compare(password,user.password);
        if(!match){
          return  res.status(400).send({error:"user not found"});
        }

        //generate token and send it
        const token =createToken(user._id);
        return res.status(201).send({token});
 
        
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}
// get me from token
export async function getMe(req,res) {
    let {id}=req.user;
    
    try {
        let user=await User.findById(id);
        if(!user){
            return res.status(400).send({error:"user not found"});
        }

        return res.status(201).send({
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role,
                status:user.status
            }
        })
        
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
    

     
    
}
//admin can see this auditlog
export async function getAuditLog(req,res) {
  //for pageanation
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 5;

    try {
        const auditLog=await AuditLog.find().populate("user","fullName").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

        if(auditLog.length==0){
            return res.status(400).send({error:"auditLog not found"});
        }
        return res.status(201).send({auditLog})
        
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}
//edit the status of user
export async function editStatus(req,res) {
     const {id}=req.user;
    
     try {
        const user=await User.findById(id);
        
        let newStatus =!user.status;

        let updatedUser = await User.findByIdAndUpdate( id, { status: newStatus },{ new: true });

        return res.status(200).send({
            user:{
                  id: updatedUser._id,
                  fullName: updatedUser.fullName,
                  email: updatedUser.email,
                  role: updatedUser.role,
                  status: updatedUser.status
            }
        })
        
     } catch (error) {
        return res.status(500).send({error:error.message});
     }
}
