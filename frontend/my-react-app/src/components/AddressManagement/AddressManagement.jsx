import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import "./AddressManagement.css";

const AddressManagement = () => {
  const {
    addresses,
    fetchAddresses,
    deleteAddress,
    updateAddress,
    searchManually,
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch addresses once on component mount
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Filter addresses based on search query
  const filteredAddresses = searchQuery
    ? addresses.filter(
        (address) =>
          address.address &&
          address.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : addresses;

  const handleUpdate = (addressId) => {
    const updatedAddress = prompt("Enter new address:");
    if (updatedAddress) {
      updateAddress(addressId, updatedAddress);
    }
  };

  const handleDelete = (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmDelete) {
      deleteAddress(addressId);
    }
  };

  return (
    <div className="address-management">
      <h2>Manage Your Addresses</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search addresses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchManually}>Search Manually</button>
      </div>

      {/* List of Addresses */}
      <div className="address-list">
        {filteredAddresses.length > 0 ? (
          filteredAddresses.map((address) => (
            <div key={address._id} className="address-item">
              <p>{address.address}</p>
              <button onClick={() => handleUpdate(address._id)}>Update</button>
              <button onClick={() => handleDelete(address._id)}>Delete</button>
              <button
                onClick={() => alert(`Address selected: ${address.address}`)}
              >
                Select
              </button>
            </div>
          ))
        ) : (
          <p>No addresses found</p>
        )}
      </div>

      {/* Option to Add New Address */}
      <div className="add-new-address">
        <button onClick={searchManually}>Add New Address</button>
      </div>
    </div>
  );
};

export default AddressManagement;
