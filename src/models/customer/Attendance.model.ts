import mongoose, { Schema, Document } from "mongoose";
import { IAttendance } from "../../interfaces";

const AttendanceSchema: Schema = new Schema({
  custDetailId: { type: String, require: true },
  deviceDetailId: { type: String, require: true },
  entryDate: { type: Date, default: Date.now() },
  entryTime: { type: Date },
  exitTime: { type: Date },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);
