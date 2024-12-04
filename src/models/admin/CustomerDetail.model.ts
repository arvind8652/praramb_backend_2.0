import mongoose, { Schema, Document } from "mongoose";
import { ICustomerDetail } from "../../interfaces";

const CustomerDetailSchema: Schema = new Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  gender: { type: String, require: true },
  photo: { type: String, require: true },
  mobile: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  weight: { type: Number, require: true },
  height: { type: Number, require: true },
  brandId: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<ICustomerDetail>(
  "CustomerDetail",
  CustomerDetailSchema
);
