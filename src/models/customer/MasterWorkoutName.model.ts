import mongoose, { Schema, Document } from "mongoose";
import { IMasterWorkoutName } from "../../interfaces";

const MasterWorkoutNameSchema: Schema = new Schema({
  brandDetailId: { type: String, require: true },
  workoutName: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IMasterWorkoutName>(
  "MasterWorkoutName",
  MasterWorkoutNameSchema
);
