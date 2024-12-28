import mongoose, { Schema, Document } from "mongoose";
import { IPaymentDetail } from "../../interfaces";

const PaymentDetailSchema: Schema = new Schema({
  custJoinDetailId: { type: String, require: true },
  custPersonalTrainerId: { type: String, require: true },
  totalAmountToPay: { type: Number, require: true },
  paymentFor: { type: String, require: true },
  brandId: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IPaymentDetail>(
  "PaymentDetail",
  PaymentDetailSchema
);
