import { Router } from "express";
import MasterWorkoutName from "../../models/customer/MasterWorkoutName.model";

const router: Router = Router();

// add new personal trainer
router.post("/masterWorkoutName", async (req, res) => {
  try {
    const { brandDetailId, workoutName } = req.body;
    const masterWorkoutName = new MasterWorkoutName({
      brandDetailId,
      workoutName,
    });
    await masterWorkoutName.save();
    res.status(201).json({
      message: "masterWorkoutName added",
      data: masterWorkoutName,
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
