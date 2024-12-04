import { Router } from "express";
import StaffDetail from "../../models/admin/StaffDetail.model";

const router: Router = Router();

// add new staff
router.post("/addStaff", async (req, res) => {
  try {
    const { name, age, certification, type, photo, address, charges, brandId } =
      req.body;
    const newStaff = new StaffDetail({
      name,
      age,
      certification,
      type,
      photo,
      address,
      charges,
      brandId,
    });
    await newStaff.save();
    res.status(201).json({ message: "Staff registered", data: newStaff });
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
