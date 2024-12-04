import mongoose, { Schema, Document } from "mongoose";
import { IStaffDetail } from "../../interfaces";

const StaffDetailSchema: Schema = new Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  certification: { type: String },
  type: { type: String, require: true },
  photo: { type: String, require: true },
  address: { type: String, require: true },
  charges: { type: Number },
  brandId: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IStaffDetail>("StaffDetail", StaffDetailSchema);
