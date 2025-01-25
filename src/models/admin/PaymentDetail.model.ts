import mongoose, { Schema, Document } from "mongoose";
import { IPaymentDetail } from "../../interfaces";

const PaymentDetailSchema: Schema = new Schema({
  // custJoinDetailId: { type: String, require: true },
  custJoinDetailId: {
    type: Schema.Types.ObjectId,
    ref: "CustomerJoiningDetail",
  },
  // custPersonalTrainerId: { type: String, require: true },
  custPersonalTrainerId: {
    type: Schema.Types.ObjectId,
    ref: "CustomerPersonalTrainer",
    default: null,
  },
  totalAmountToPay: { type: Number, require: true },
  paymentFor: { type: String, require: true },
  // brandId: { type: String, require: true },
  brandId: { type: Schema.Types.ObjectId, ref: "BrandDetail" },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IPaymentDetail>(
  "PaymentDetail",
  PaymentDetailSchema
);
