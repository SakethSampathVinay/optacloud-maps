import express from "express";
import Address from "../models/addressModel.js";

// API Route to save the address
const saveAddress = async (req, res) => {
  const { houseNo, area, category } = req.body;

  if (!houseNo || !area || !category) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const newAddress = new Address({ houseNo, area, category });

  try {
    await newAddress.save();
    res.status(200).json({ message: "Address saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving address", error: err });
  }
};

// API Route to get all saved addresses
const getAllAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses", error: err });
  }
};

export { saveAddress, getAllAddress };
