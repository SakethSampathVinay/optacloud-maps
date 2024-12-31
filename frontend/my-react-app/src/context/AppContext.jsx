import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const [showModal, setShowModal] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Function to request the user's location
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

  // Function to get address from coordinates using OpenCage Geocoding API
  const getAddressFromCoordinates = (latitude, longitude) => {
    const apiKey = "6e2ec7e2ae2344fea26387118ea4dbba";
    console.log(apiKey); // Get API key from environment
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const components = data.results[0].components;

          // Extract city, state, and pincode
          const city =
            components.city || components.town || components.village || "";
          const state = components.state || "";
          const postalCode = components.postcode || "";

          // Format the address as "City, State - Pincode"
          const formattedAddress = `${city}, ${state} - ${postalCode}`;
          setDeliveryAddress(formattedAddress);
          setShowModal(false); // Close the modal
        } else {
          console.error("Error fetching address:", data.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  // Function to allow manual address search
  const searchManually = () => {
    const userAddress = prompt("Please enter your address:");
    if (userAddress) {
      setDeliveryAddress(userAddress);
      setShowModal(false);
    }
  };

  // Function to save the address to the backend
  const saveAddress = async (address) => {
    try {
      const response = await axios.post(
        `${backendUrl}/address/saveAddress`, // Using environment variable for backend URL
        { address }
      );
      console.log(response.data.message); // Show success message
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  // Function to fetch addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/address/getAddresses`);
      console.log(response.data); // Display the list of addresses
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Failed to fetch addresses. Please try again.");
    }
  };

  // Store token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
