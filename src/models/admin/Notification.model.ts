import mongoose, { Schema, Document } from "mongoose";
import { INotification } from "../../interfaces";

const NotificationSchema: Schema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  postedDate: { type: Date, default: Date.now() },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date },
  brandDetailId: { type: String, require: true },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
