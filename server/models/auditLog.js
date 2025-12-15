import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  action: {
    type: String,
    enum: ["CREATE", "UPDATE", "DELETE", "OTHER"],
    required: true, 
  },
  collectionName: {
    type: String,
    required: true, 
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "collectionName",
    required: false,
  },
  oldData: {
    type: Object, 
    default: null,
  },
  newData: {
    type: Object,
    default: null,
  },
},{ timestamps: true });

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
