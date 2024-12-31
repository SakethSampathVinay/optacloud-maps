import express from "express";

import {
  saveAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/saveAddress", saveAddress);
addressRouter.get("/getAddresses", getAllAddress);
addressRouter.put("/addresses/:id", updateAddress);
addressRouter.delete("/addresses/:id", deleteAddress);

export default addressRouter;