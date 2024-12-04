import { Router } from "express";
import PayedAmountDetail from "../../models/admin/PayedAmountDetail.model";

const router: Router = Router();

// add new personal trainer
router.post("/payedAmountDetail", async (req, res) => {
  try {
    const { paymentDetailId, amount, paymentDate, transactionId } = req.body;
    const payedAmountDetail = new PayedAmountDetail({
      paymentDetailId,
      amount,
      paymentDate,
      transactionId,
    });
    await payedAmountDetail.save();
    res.status(201).json({
      message: "payed amount detail added",
      data: payedAmountDetail,
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
