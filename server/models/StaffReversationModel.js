import mongoose  from "mongoose";

const staffReversationSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    senderStaffId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
    },
    reciverStaffId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
    },
   


},{ timestamps: true });

staffReversationSchema.pre("save", function (next) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  if (this.date < today) {
    
    const error = new Error("Reservation date cannot be in the past");
    return next(error);
  }

  next(); 
});




export const staffReversation=mongoose.model("staffReversation",staffReversationSchema);