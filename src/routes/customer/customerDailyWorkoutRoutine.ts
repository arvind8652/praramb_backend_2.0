import { Router } from "express";
import CustomerDailyWorkoutRoutine from "../../models/customer/CustomerDailyWorkoutRoutine.model";

const router: Router = Router();

// add new personal trainer
router.post("/customerDailyWorkoutRoutine", async (req, res) => {
  try {
    const {
      mstWorkoutNameId,
      custDetailId,
      dayName,
      customDayName,
      workoutName,
    } = req.body;
    const customerDailyWorkoutRoutine = new CustomerDailyWorkoutRoutine({
      mstWorkoutNameId,
      custDetailId,
      dayName,
      customDayName,
      workoutName,
    });
    await customerDailyWorkoutRoutine.save();
    res.status(201).json({
      message: "customerDailyWorkoutRoutine added",
      data: customerDailyWorkoutRoutine,
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
