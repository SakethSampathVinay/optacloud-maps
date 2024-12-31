import React, { useState } from "react";
import "./AddressForm.css"; // Optional, for styling

const AddressForm = () => {
  const [address, setAddress] = useState({
    houseNumber: "",
    area: "",
    category: "", // Store selected category (Home, Office, Friends & Family)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    setAddress((prevState) => ({
      ...prevState,
      category,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the address (could be saving to state or API call)
    alert("Address saved!");
    console.log(address); // Or save to state/context
  };

  return (
    <div className="address-form-container">
      <h2>Delivery Address Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="houseNumber">House/Flat/Block No.</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={address.houseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="area">Apartment/Road/Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={address.area}
            onChange={handleChange}
            required
          />
        </div>

        <div className="category-selection">
          <p>Select Address Category:</p>
          <div className="category-icons">
            <div
              className={`category-icon ${
                address.category === "Home" ? "selected" : ""
              }`}
              onClick={() => handleCategoryChange("Home")}
            >
              <i className="fa fa-home" aria-hidden="true"></i>
              <span>Home</span>
            </div>
            <div
              className={`category-icon ${
                address.category === "Office" ? "selected" : ""
              }`}
              onClick={() => handleCategoryChange("Office")}
            >
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <span>Office</span>
            </div>
            <div
              className={`category-icon ${
                address.category === "Friends & Family" ? "selected" : ""
              }`}
              onClick={() => handleCategoryChange("Friends & Family")}
            >
              <i className="fa fa-users" aria-hidden="true"></i>
              <span>Friends & Family</span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
