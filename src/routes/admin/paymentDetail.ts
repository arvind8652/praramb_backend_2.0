import { Router } from "express";
import PaymentDetail from "../../models/admin/PaymentDetail.model";

const router: Router = Router();

// add new personal trainer
router.post("/paymentDetail", async (req, res) => {
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
      message: "payment detail added",
      data: paymentDetail,
    });
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

export default router;
