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
      custDetailId: customerId,
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

router.post("/customerList", async (req, res) => {
  try {
    const { brandId } = req.body;
    const customerList_ = await CustomerDetail.find({
      brandId: brandId,
      status: 1,
    });

    const customerList = await CustomerDetail.aggregate([
      {
        $match: {
          brandId: brandId,
          status: 1,
        },
      },
      {
        $addFields: {
          userIdString: { $toString: "$_id" }, // Convert ObjectId to string
        },
      },
      {
        $lookup: {
          from: "customerjoiningdetails",
          localField: "userIdString",
          foreignField: "custDetailId",
          as: "joiningDetail",
        },
      },
      {
        $unwind: "$joiningDetail",
      },
      {
        $addFields: {
          // startDate: "$joiningDetail.startDate",
          // endDate: "$joiningDetail.expiryDate",
          startDate: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$joiningDetail.startDate",
            },
          },
          endDate: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$joiningDetail.expiryDate",
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          age: 1,
          gender: 1,
          // "joiningDetail.startDate": 1,
          startDate: 1,
          endDate: 1,
        },
      },
    ]);
    res.status(200).json({ message: "Customer List", data: customerList });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
