import { Router } from "express";
import Attendance from "../../models/customer/Attendance.model";

const router: Router = Router();

// add new personal trainer
router.post("/attendance", async (req, res) => {
  try {
    const { custDetailId, deviceDetailId, entryDate, entryTime, exitTime } =
      req.body;
    const attendance = new Attendance({
      custDetailId,
      deviceDetailId,
      entryDate,
      entryTime,
      exitTime,
    });
    await attendance.save();
    res.status(201).json({
      message: "attendance added",
      data: attendance,
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
