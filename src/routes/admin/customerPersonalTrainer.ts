import { Router } from "express";
import CustomerPersonalTrainer from "../../models/admin/CustomerPersonalTrainer.model";

const router: Router = Router();

// add new personal trainer
router.post("/personalTrainer", async (req, res) => {
  try {
    const { custDetailId, staffDetailId, startDate, endDate } = req.body;
    const customerPersonalTrainer = new CustomerPersonalTrainer({
      custDetailId,
      staffDetailId,
      startDate,
      endDate,
    });
    await customerPersonalTrainer.save();
    res.status(201).json({
      message: "personal trainer added",
      data: customerPersonalTrainer,
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
