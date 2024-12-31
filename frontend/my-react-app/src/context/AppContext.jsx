import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showModal, setShowModal] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [addresses, setAddresses] = useState([]);

  // Request user location
  const enableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getAddressFromCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Location permission denied.");
      }
    );
  };

  // Fetch address using OpenCage Geocoding API
  const getAddressFromCoordinates = (latitude, longitude) => {
    const apiKey = "6e2ec7e2ae2344fea26387118ea4dbba";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const components = data.results[0].components;
          const city =
            components.city || components.town || components.village || "";
          const state = components.state || "";
          const postalCode = components.postcode || "";
          const formattedAddress = `${city}, ${state} - ${postalCode}`;
          setDeliveryAddress(formattedAddress);
          setShowModal(false);
        } else {
          console.error("Error fetching address:", data.status);
        }
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  // Manual address entry
  const searchManually = () => {
    const userAddress = prompt("Please enter your address:");
    if (userAddress) {
      setDeliveryAddress(userAddress);
      setShowModal(false);
    }
  };

  // Save address to the backend
  const saveAddress = async (address) => {
    try {
      await axios.post(`${backendUrl}/address/saveAddress`, { address });
      alert("Address saved successfully!");
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  // Fetch all addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/address/getAddresses`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Failed to fetch addresses. Please try again.");
    }
  };

  // Update an address
  const updateAddress = async (addressId, updatedAddress) => {
    try {
      await axios.put(`${backendUrl}/api/address/updateAddress/${addressId}`, {
        address: updatedAddress,
      });
      alert("Address updated successfully!");
      fetchAddresses();
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  // Delete an address
  const deleteAddress = async (addressId) => {
    try {
      await axios.delete(
        `${backendUrl}/api/address/deleteAddress/${addressId}`
      );
      alert("Address deleted successfully!");
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address. Please try again.");
    }
  };

  // Update localStorage whenever the token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Provide values to the context
  const value = {
    backendUrl,
    token,
    setToken,
    showModal,
    setShowModal,
    deliveryAddress,
    setDeliveryAddress,
    enableLocation,
    searchManually,
    saveAddress,
    fetchAddresses,
    addresses,
    updateAddress,
    deleteAddress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
