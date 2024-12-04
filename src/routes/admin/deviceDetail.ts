import { Router } from "express";
import DeviceDetail from "../../models/admin/DeviceDetail.model";

const router: Router = Router();

// add new personal trainer
router.post("/deviceDetail", async (req, res) => {
  try {
    const { name, description, brandDetailId } = req.body;
    const deviceDetail = new DeviceDetail({
      name,
      description,
      brandDetailId,
    });
    await deviceDetail.save();
    res.status(201).json({
      message: "device detail added",
      data: deviceDetail,
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
