import { Router } from "express";
import CustomerJoiningDetail from "../../models/admin/CustomerJoiningDetail.model";

const router: Router = Router();

// add new customer
router.post("/joinDetail", async (req, res) => {
  try {
    const { custDetailId, registrationDate, startDate, expiryDate } = req.body;
    const customerJoinDetail = new CustomerJoiningDetail({
      custDetailId,
      registrationDate,
      startDate,
      expiryDate,
    });
    await customerJoinDetail.save();
    res
      .status(201)
      .json({ message: "join detail added", data: customerJoinDetail });
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
