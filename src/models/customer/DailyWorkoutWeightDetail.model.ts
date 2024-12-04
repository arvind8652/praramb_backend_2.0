import mongoose, { Schema, Document } from "mongoose";
import { IDailyWorkoutWeightDetail } from "../../interfaces";

const DailyWorkoutWeightDetailSchema: Schema = new Schema({
  mstWorkoutNameId: { type: String, require: true },
  custDetailId: { type: String, require: true },
  attendanceId: { type: String, require: true },
  maxWeight: { type: Number, require: true },
  bodyWeight: { type: Number, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IDailyWorkoutWeightDetail>(
  "DailyWorkoutWeightDetail",
  DailyWorkoutWeightDetailSchema
);
