import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet"; // For custom icons and map interaction
import "./LocationPermissionModal.css";

const LocationModal = ({ onClose, onEnableLocation, setAddress }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([17.385044, 78.486671]); // Default coordinates (Hyderabad)
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddressState] = useState("");
  const markerRef = useRef(null); // Reference to the Marker instance

  // Fetch user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMarkerPosition([latitude, longitude]); // Center the map on user location
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fetch address based on latitude and longitude using OpenCage API
  const fetchAddress = async (lat, lng) => {
    const apiKey = "6e2ec7e2ae2344fea26387118ea4dbba"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;
        const city =
          components.city || components.town || components.village || "";
        const state = components.state || "";
        const postalCode = components.postcode || "";
        const formattedAddress = `${city}, ${state} - ${postalCode}`;
        setAddress(formattedAddress);
        setAddressState(formattedAddress); // Update local state to show the address
      } else {
        console.error("Error fetching address:", data.status);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Component to handle map clicks and dragging the marker
  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddress(e.latlng.lat, e.latlng.lng); // Fetch address when clicking
      },
      dragend(e) {
        const latlng = markerRef.current.getLatLng(); // Access marker's position after drag
        setMarkerPosition([latlng.lat, latlng.lng]); // Update position after dragging
        fetchAddress(latlng.lat, latlng.lng); // Fetch address when dragging marker
      },
    });
    return null;
  };

  // Effect to fetch address for the initial position
  useEffect(() => {
    fetchAddress(markerPosition[0], markerPosition[1]);
  }, [markerPosition]);

  return (
    <div className="modal-overlay">
      {!isMapOpen ? (
        <div className="modal">
          <h2>Location Permission</h2>
          <p>Please grant permission to access your location.</p>
          <div className="modal-actions">
            <button
              className="modal-button enable"
              onClick={() => {
                getUserLocation();
                onEnableLocation();
              }}
            >
              Enable Location
            </button>
            <button
              className="modal-button manual"
              onClick={() => setIsMapOpen(true)}
            >
              Search Manually
            </button>
          </div>
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </div>
      ) : (
        <div className="modal">
          <h2>Select Your Location</h2>
          <p>Click on the map to select your address or adjust the pin.</p>
          <MapContainer
            center={userLocation || markerPosition}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker
              position={markerPosition}
              draggable={true} // Allow the marker to be dragged
              ref={markerRef} // Attach the ref to the Marker
            >
              <Popup>{address || "Loading address..."}</Popup>
            </Marker>
            <LocationSelector />
          </MapContainer>
          <div className="location-details">
            <p>Selected Address: {address || "No address selected"}</p>
          </div>
          <button
            className="modal-button enable"
            onClick={() => fetchAddress(markerPosition[0], markerPosition[1])}
          >
            Confirm Address
          </button>
          <button className="modal-close" onClick={() => setIsMapOpen(false)}>
            X
          </button>
          <button className="modal-button locate-me" onClick={getUserLocation}>
            Locate Me
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationModal;
