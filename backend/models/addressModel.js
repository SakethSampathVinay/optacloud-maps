import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  houseNo: String,
  area: String,
  category: String,
});

const Address = mongoose.model("Address", addressSchema);

export default Address;