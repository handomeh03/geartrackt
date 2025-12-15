import mongoose from "mongoose";

const ItemReversationSchema = new mongoose.Schema({
  startDate: {
     type: Date,
      required: true
     },
  equipment: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
       required: true
       },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
      required: true 
    },
}, { timestamps: true });


ItemReversationSchema.pre("save", async function(next) {
 
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(this.startDate);
  startDate.setHours(0, 0, 0, 0);

  if (startDate.getTime() !== today.getTime()) {
    return next(new Error("The reservation must be from today"));
  }


  next();
});

export const ItemReversation = mongoose.model("ItemReversation", ItemReversationSchema);
