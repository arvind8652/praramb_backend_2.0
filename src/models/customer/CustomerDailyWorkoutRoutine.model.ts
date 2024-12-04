import mongoose, { Schema, Document } from "mongoose";
import { ICustomerDailyWorkoutRoutine } from "../../interfaces";

const CustomerDailyWorkoutRoutineSchema: Schema = new Schema({
  mstWorkoutNameId: { type: String, require: true },
  custDetailId: { type: String, require: true },
  dayName: { type: String, require: true },
  customDayName: { type: String, require: true },
  workoutName: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<ICustomerDailyWorkoutRoutine>(
  "CustomerDailyWorkoutRoutine",
  CustomerDailyWorkoutRoutineSchema
);
