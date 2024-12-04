import mongoose, { Schema, Document } from "mongoose";
import { IMasterWorkoutDetail } from "../../interfaces";

const MasterWorkoutNameSchema: Schema = new Schema({
  mstWorkoutNameId: { type: String, require: true },
  name: { type: String, require: true },
  photo: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IMasterWorkoutDetail>(
  "MasterWorkoutName",
  MasterWorkoutNameSchema
);
