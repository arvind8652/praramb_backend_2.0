import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import PaymentDetail from "../../models/admin/PaymentDetail.model";

const router: Router = Router();

// Add new personal trainer
router.post("/paymentDetail", async (req: Request, res: Response) => {
  try {
    const {
      custJoinDetailId,
      custPersonalTrainerId,
      totalAmount,
      noOfInstallment,
      installmentInterval,
    } = req.body;
    const paymentDetail = new PaymentDetail({
      custJoinDetailId,
      custPersonalTrainerId,
      totalAmount,
      noOfInstallment,
      installmentInterval,
    });
    await paymentDetail.save();
    res.status(201).json({
      message: "Payment detail added",
      data: paymentDetail,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// Payment list
router.post("/paymentList", async (req: Request, res: Response) => {
  try {
    const { brandId } = req.body;
    const paymentList = await PaymentDetail.find({
      brandId: brandId,
      status: 1,
    })
      .populate({
        path: "custJoinDetailId",
        populate: {
          path: "custDetailId",
          model: "CustomerDetail",
          select: { name: 1, mobile: 1, email: 1, gender: 1 },
        },
        select: { registrationDate: 1, startDate: 1, expiryDate: 1 },
      })
      .exec();

    res.status(200).json({ message: "Payment List", data: paymentList });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// GET request to retrieve a payment detail by ID
router.get("/paymentDetails/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid payment detail ID" });
    }

    const paymentDetail = await PaymentDetail.findById(id)
      .populate({
        path: "custJoinDetailId",
        populate: {
          path: "custDetailId",
          model: "CustomerDetail",
          select: { name: 1, mobile: 1, email: 1, gender: 1 },
        },
        select: "registrationDate startDate expiryDate",
      })
      .select("totalAmountToPay paymentFor brandId status createdAt")
      .lean();
    if (!paymentDetail) {
      return res.status(404).json({ message: "Payment detail not found" });
    }

    res.status(200).json(paymentDetail);
  } catch (error) {
    console.error("Error retrieving payment detail:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
