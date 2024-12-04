import mongoose, { Schema, Document } from "mongoose";
import { IDeviceDetail } from "../../interfaces";

const DeviceDetailSchema: Schema = new Schema({
  name: { type: String, require: true },
  brandDetailId: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IDeviceDetail>(
  "DeviceDetail",
  DeviceDetailSchema
);
