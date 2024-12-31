import express from "express";

import { saveAddress, getAllAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/saveAddress", saveAddress);
addressRouter.get("/getAddresses", getAllAddress);

export default addressRouter;