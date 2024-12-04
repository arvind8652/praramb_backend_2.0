import { Router } from "express";
import DailyWorkoutWeightDetail from "../../models/customer/DailyWorkoutWeightDetail.model";

const router: Router = Router();

// add new personal trainer
router.post("/dailyWorkoutWeightDetail", async (req, res) => {
  try {
    const {
      mstWorkoutNameId,
      custDetailId,
      attendanceId,
      maxWeight,
      bodyWeight,
    } = req.body;
    const dailyWorkoutWeightDetail = new DailyWorkoutWeightDetail({
      mstWorkoutNameId,
      custDetailId,
      attendanceId,
      maxWeight,
      bodyWeight,
    });
    await dailyWorkoutWeightDetail.save();
    res.status(201).json({
      message: "DailyWorkoutWeightDetail added",
      data: dailyWorkoutWeightDetail,
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
