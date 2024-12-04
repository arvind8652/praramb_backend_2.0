import { Router } from "express";
import CustomerDetail from "../../models/admin/CustomerDetail.model";
import CustomerJoiningDetail from "../../models/admin/CustomerJoiningDetail.model";
import PaymentDetail from "../../models/admin/PaymentDetail.model";
import PersonalTrainer from "../../models/admin/CustomerPersonalTrainer.model";
import mongoose from "mongoose";

const router: Router = Router();

const customerPersonalDetail = async (personalDetail: any) => {
  try {
    const {
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      brandId,
    } = personalDetail;
    const newCustomer = new CustomerDetail({
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      brandId,
    });
    await newCustomer.save();
    return { message: "customer registered", data: newCustomer };
    // res.status(201).json({ message: "customer registered", data: newCustomer });
  } catch (error) {
    let errorData;
    if (error instanceof Error) {
      errorData = error.message; // Now TypeScript knows 'error' is an Error
    } else {
      errorData = error; // For non-error objects
    }
    // res.status(500).json({ error: errorData });
    return { error: errorData };
  }
};

// add new customer
router.post("/addCustomer", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      brandId,
    } = req.body;
    const newCustomer = new CustomerDetail({
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      brandId,
    });
    await newCustomer.save();
    res.status(201).json({ message: "customer registered", data: newCustomer });
  } catch (error) {
    let errorData;
    if (error instanceof Error) {
      errorData = error.message; // Now TypeScript knows 'error' is an Error
    } else {
      errorData = error; // For non-error objects
    }
    res.status(500).json({ error: errorData });
  }
});

// register new customer
router.post("/addCust_", async (req, res) => {
  try {
    const {
      // start personal detail data
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      // end personal detail data
      brandId,
      // start registration detail data
      registrationDate,
      startDate,
      expiryDate,

      // end registration detail data
      // start payment detail data
      totalAmountToPay,
      // end payment detail data
    } = req.body;
    const newCustomer = new CustomerDetail({
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      brandId,
    });
    await newCustomer.save();
    // res.status(201).json({ message: "customer registered", data: newCustomer });
    let customerId = newCustomer?._id;
    const registerDetail = new CustomerJoiningDetail({
      customerId,
      registrationDate,
      startDate,
      expiryDate,
    });
    await registerDetail.save();
    let registerId = registerDetail?._id;

    const paymentDetail = new PaymentDetail({
      totalAmountToPay,
      custJoinDetailId: registerId,
      custPersonalTrainerId: "",
      paymentFor: "registrationAmt",
    });
    await paymentDetail.save();
  } catch (error) {
    let errorData;
    if (error instanceof Error) {
      errorData = error.message; // Now TypeScript knows 'error' is an Error
    } else {
      errorData = error; // For non-error objects
    }
    res.status(500).json({ error: errorData });
  }
});

router.post("/addCust", async (req, res) => {
  const session = await mongoose.startSession(); // Start a transaction session
  session.startTransaction();
  try {
    const {
      // start personal detail data
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      // end personal detail data
      brandId,
      // start registration detail data
      registrationDate,
      startDate,
      expiryDate,
      // end registration detail data
      // start payment detail data
      totalAmountToPay,
      // end payment detail data
    } = req.body;

    // Validate the input (add your own validation logic or use a library like Joi)

    // Save customer details
    const newCustomer = new CustomerDetail({
      name,
      age,
      gender,
      photo,
      mobile,
      email,
      address,
      weight,
      height,
      brandId,
    });
    await newCustomer.save({ session });
    const customerId = newCustomer._id;

    // Save registration details
    const registerDetail = new CustomerJoiningDetail({
      customerId,
      registrationDate,
      startDate,
      expiryDate,
    });
    await registerDetail.save({ session });
    const registerId = registerDetail._id;

    // Save payment details
    const paymentDetail = new PaymentDetail({
      totalAmountToPay,
      custJoinDetailId: registerId,
      custPersonalTrainerId: "",
      paymentFor: "registrationAmt",
    });
    await paymentDetail.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send a success response
    res.status(201).json({
      message: "Customer registered successfully",
      data: {
        customer: newCustomer,
        registration: registerDetail,
        payment: paymentDetail,
      },
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    // Handle error response
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
