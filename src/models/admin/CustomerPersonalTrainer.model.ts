import mongoose, { Schema, Document } from "mongoose";
import { ICustomerPersonalTrainer } from "../../interfaces";

const CustomerPersonalTrainerSchema: Schema = new Schema({
  // custJoinDetailId: { type: String, require: true },
  custJoinDetailId: { type: Schema.Types.ObjectId, ref: "custJoinDetailId" },
  // staffDetailId: { type: String, require: true },
  staffDetailId: { type: Schema.Types.ObjectId, ref: "staffDetailId" },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<ICustomerPersonalTrainer>(
  "CustomerPersonalTrainer",
  CustomerPersonalTrainerSchema
);
