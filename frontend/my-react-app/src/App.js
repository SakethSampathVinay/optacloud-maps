import React, { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import LocationModal from "./components/LocationModal/LocationPermissionModal";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import "./App.css"

const App = () => {
  const {
    showModal,
    setShowModal,
    deliveryAddress,
    enableLocation,
    searchManually,
  } = useContext(AppContext);

  return (
    <div>
      <Navbar />
      {showModal && (
        <LocationModal
          onClose={() => setShowModal(false)}
          onEnableLocation={enableLocation}
          onSearchManually={searchManually}
        />
      )}

      <div>
        <h3 className="delivery-address-heading">Delivery Address: {deliveryAddress}</h3>
      </div>
      <Home />
      <Footer />
    </div>
  );
};

export default App;
