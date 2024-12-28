import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import customerDetail from "./routes/admin/customerDetail";
import paymentDetail from "./routes/admin/paymentDetail";
import staffDetail from "./routes/admin/staffDetail";
import login from "./routes/admin/login";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;
const dbURL = process.env.ATLAS_URL || "";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "praramb",
};

// Allow requests from specific origins
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // Allow cookies if needed
  })
);

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(dbURL, connectionParams)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/customer", customerDetail);
app.use("/payment", paymentDetail);
app.use("/staff", staffDetail);
app.use("/login", login);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
