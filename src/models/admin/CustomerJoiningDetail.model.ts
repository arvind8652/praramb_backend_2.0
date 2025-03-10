import mongoose, { Schema, Document } from "mongoose";
import { ICustomerJoiningDetail } from "../../interfaces";

const CustomerJoiningDetailSchema: Schema = new Schema({
  // custDetailId: { type: String, require: true },
  custDetailId: { type: Schema.Types.ObjectId, ref: "CustomerDetail" },
  registrationDate: { type: Date, default: Date.now() },
  startDate: { type: Date, default: Date.now() },
  expiryDate: { type: Date },
  // brandId: { type: String, require: true },
  brandId: { type: Schema.Types.ObjectId, ref: "BrandDetail" },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<ICustomerJoiningDetail>(
  "CustomerJoiningDetail",
  CustomerJoiningDetailSchema
);
