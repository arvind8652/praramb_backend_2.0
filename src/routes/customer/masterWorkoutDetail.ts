import { Router } from "express";
import MasterWorkoutDetail from "../../models/customer/MasterWorkoutDetail.model";

const router: Router = Router();

// add new personal trainer
router.post("/masterWorkoutDetail", async (req, res) => {
  try {
    const { mstWorkoutNameId, name, photo } = req.body;
    const masterWorkoutDetail = new MasterWorkoutDetail({
      mstWorkoutNameId,
      name,
      photo,
    });
    await masterWorkoutDetail.save();
    res.status(201).json({
      message: "masterWorkoutDetail added",
      data: masterWorkoutDetail,
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
