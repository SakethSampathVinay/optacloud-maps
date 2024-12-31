import React, { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import LocationModal from "./components/LocationModal/LocationPermissionModal";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login.jsx";
import AddressForm from "./components/AddressForm/AddressForm"; // Assuming AddressForm is imported from a path
import { Route, Routes, Navigate, Link } from "react-router-dom"; // Use Navigate and Link for navigation
import "./App.css";
import 'font-awesome/css/font-awesome.min.css';


const App = () => {
  const {
    showModal,
    setShowModal,
    deliveryAddress,
    enableLocation,
    searchManually,
    token, // Assuming token is used for authentication check
  } = useContext(AppContext);

  return (
    <div>
      {/* Conditionally render Login or Home based on whether the user is logged in */}
      <Navbar />
      {showModal && (
        <LocationModal
          onClose={() => setShowModal(false)}
          onEnableLocation={enableLocation}
          onSearchManually={searchManually}
        />
      )}

      <div>
        <h3 className="delivery-address-heading">
          Delivery Address: {deliveryAddress}
        </h3>
        {/* Link to navigate to Address Form */}
        <Link to="/address">
          <button>Go to Address Form</button>
        </Link>
      </div>

      <Routes>
        {/* Define routes for the application */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/address" element={<AddressForm />} />
        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to={token ? "/home" : "/login"} />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
