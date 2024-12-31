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

// API Route to update an existing address
const updateAddress = async (req, res) => {
  const { id } = req.params; // Address ID to identify the address to update
  const { houseNo, area, category } = req.body; // New address data

  // Validate the input data
  if (!houseNo || !area || !category) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { houseNo, area, category },
      { new: true } // Return the updated document
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ message: "Address updated successfully!", updatedAddress });
  } catch (err) {
    res.status(500).json({ message: "Error updating address", error: err });
  }
};

// API Route to delete an address
const deleteAddress = async (req, res) => {
  const { id } = req.params; // Address ID to delete

  try {
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address", error: err });
  }
};

export { saveAddress, getAllAddress, updateAddress, deleteAddress };

