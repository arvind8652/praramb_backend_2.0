import mongoose, { Schema, Document } from "mongoose";
import { IBrandDetail } from "../../interfaces";

const BrandDetailSchema: Schema = new Schema({
  name: { type: String, require: true },
  maxCapacity: { type: Number },
  timing: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IBrandDetail>("BrandDetail", BrandDetailSchema);
