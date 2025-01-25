import { Router } from "express";
import PaymentDetail from "../../models/admin/PaymentDetail.model";

const router: Router = Router();

// add new personal trainer
router.post("/paymentDetail", async (req, res) => {
  try {
    const {
      custJoinDetailId,
      custPersonalTrainerId,
      totalAmount,
      noOfInstallment,
      installmentInterval,
    } = req.body;
    const paymentDetail = new PaymentDetail({
      custJoinDetailId,
      custPersonalTrainerId,
      totalAmount,
      noOfInstallment,
      installmentInterval,
    });
    await paymentDetail.save();
    res.status(201).json({
      message: "payment detail added",
      data: paymentDetail,
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

//paymentlist
router.post("/paymentList", async (req, res) => {
  try {
    const { brandId } = req.body;
    const paymentList_ = await PaymentDetail.find(
      {
        brandId: brandId,
        status: 1,
      },
      { brandId: 0, __v: 0, updatedAt: 0, createdAt: 0 }
    );

    const paymentList = await PaymentDetail.find({
      brandId: brandId,
      status: 1,
    })
      .populate({
        path: "custJoinDetailId",
        populate: {
          path: "custDetailId",
          model: "CustomerDetail",
          select: { name: 1, mobile: 1, email: 1 },
        },
        select: { registrationDate: 1, startDate: 1, expiryDate: 1 },
      })
      .exec()
      .then((data) => {
        return data;
        console.log(JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        console.error(error);
      });
    res.status(200).json({ message: "Payment List", data: paymentList });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});
export default router;
