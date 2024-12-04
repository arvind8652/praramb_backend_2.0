import { Document } from "mongoose";

interface commonInterface extends Document {
  createdAt: Date;
  updatedAt: Date;
  status: number;
}

// interface for admin
export interface IBrandDetail extends commonInterface {
  name: string;
  maxCapacity: number;
  timing: string;
}

export interface IStaffDetail extends commonInterface {
  name: string;
  age: number;
  certification?: string;
  type: string;
  photo: string;
  address: string;
  charges?: number;
  brandId: string;
}

export interface ICustomerDetail extends commonInterface {
  name: string;
  age: number;
  gender: string;
  photo: string;
  mobile: string;
  email: string;
  address: string;
  weight: number;
  height: number;
  brandId: string;
}

export interface ICustomerJoiningDetail extends commonInterface {
  custDetailId: string;
  registrationDate: Date;
  startDate?: Date;
  expiryDate: Date;
}

export interface ICustomerPersonalTrainer extends commonInterface {
  custJoinDetailId: string;
  staffDetailId: string;
  startDate: Date;
  endDate: Date;
}

export interface IPaymentDetail extends commonInterface {
  custJoinDetailId: string;
  custPersonalTrainerId: string;
  totalAmount: number;
  noOfInstallment: number;
  installmentInterval: number;
}

export interface IPayedAmountDetail extends commonInterface {
  paymentDetailId: string;
  amount: number;
  paymentDate: Date;
  transactionId: string;
}

export interface IPayedAmountDetail extends commonInterface {
  paymentDetailId: string;
  amount: number;
  paymentDate: Date;
  transactionId: string;
}

export interface IDeviceDetail extends commonInterface {
  name: string;
  description: string;
  brandDetailId: string;
}

export interface INotification extends commonInterface {
  title: string;
  description: string;
  postedDate: Date;
  startDate: Date;
  endDate: Date;
  brandDetailId: string;
}

// interface for customer
export interface IAttendance extends commonInterface {
  custDetailId: string;
  deviceDetailId: string;
  entryDate: Date;
  entryTime: Date;
  exitTime: Date;
}

export interface IMasterWorkoutName extends commonInterface {
  brandDetailId: string;
  workoutName: string;
}

export interface IMasterWorkoutDetail extends commonInterface {
  mstWorkoutNameId: string;
  name: string;
  photo: string;
}

export interface IDailyWorkoutWeightDetail extends commonInterface {
  mstWorkoutNameId: string;
  custDetailId: string;
  attendanceId: string;
  maxWeight: number;
  bodyWeight: number;
}

export interface ICustomerDailyWorkoutRoutine extends commonInterface {
  mstWorkoutNameId: string;
  custDetailId: string;
  dayName: string;
  customDayName: string;
  workoutName: string;
}
