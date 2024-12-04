import mongoose, { Schema, Document } from "mongoose";
import { IPayedAmountDetail } from "../../interfaces";

const PayedAmountDetailSchema: Schema = new Schema({
  payedAmountDetailId: { type: String, require: true },
  amount: { type: Number, require: true },
  paymentDate: { type: Date, default: Date.now() },
  transactionId: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IPayedAmountDetail>(
  "PayedAmountDetail",
  PayedAmountDetailSchema
);
