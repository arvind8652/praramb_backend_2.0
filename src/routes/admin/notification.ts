import { Router } from "express";
import Notification from "../../models/admin/Notification.model";

const router: Router = Router();

// add new staff
router.post("/addNotification", async (req, res) => {
  try {
    const {
      title,
      description,
      postedDate,
      startDate,
      endDate,
      brandDetailId,
    } = req.body;
    const notification = new Notification({
      title,
      description,
      postedDate,
      startDate,
      endDate,
      brandDetailId,
    });
    await notification.save();
    res.status(201).json({ message: "added notification", data: notification });
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
