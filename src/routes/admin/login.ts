import { Router } from "express";
import BrandDetail from "../../models/admin/BrandDetail.model";

const router: Router = Router();

//  login for admin
router.post("/", async (req, res) => {
  try {
    const { id, password } = req.body;
    if (id === "admin" && password === "admin") {
      const brandDetail = await BrandDetail.find();
      res.status(200).json({ message: "brand Detail", data: brandDetail[0] });
    } else {
      res.status(400).json({ message: "invalid credintial", data: "" });
    }
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

// adding brand detail
router.post("/addBrandDetail", async (req, res) => {
  try {
    const { name, maxCapacity, timing } = req.body;
    const brandDetail = new BrandDetail({
      name,
      maxCapacity,
      timing,
    });
    await brandDetail.save();
    res.status(201).json({ message: "added brand detail", data: brandDetail });
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
