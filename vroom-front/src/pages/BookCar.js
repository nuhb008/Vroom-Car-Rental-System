import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import the actual API service
import { getCarByRegNo } from "../services/api";

const BookCar = () => {
  const { regNo } = useParams(); // Get regNo from URL params
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    getCarByRegNo(regNo)
      .then(response => {
        setCarDetails(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching car details:", error);
        setError("Failed to load car details. Please try again.");
        setIsLoading(false);
      });
  }, [regNo]);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !carDetails) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.round((end - start) / (1000 * 3600 * 24));
    
    if (days > 0) {
      setTotalPrice(days * carDetails.rate);
    } else {
      alert('Please select a valid date range.');
      setTotalPrice(0);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading car details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!carDetails) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-600">Car not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book Car</h1>
      
      <div className="mb-4">
        <div className="font-medium">Car Model:</div>
        <div className="bg-white p-2 border rounded">{carDetails.model}</div>
      </div>
      
      <div className="mb-4">
        <div className="font-medium">Registration No:</div>
        <div className="bg-white p-2 border rounded">{carDetails.regNo}</div>
      </div>
      
      <div className="mb-4">
        <div className="font-medium">Daily Rate:</div>
        <div className="bg-white p-2 border rounded">${carDetails.rate}</div>
      </div>
      
      <div className="mb-4">
        <label className="block font-medium mb-1">Start Date:</label>
        <input 
          type="date" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
          min={new Date().toISOString().split('T')[0]} // Prevent past dates
        />
      </div>
      
      <div className="mb-6">
        <label className="block font-medium mb-1">End Date:</label>
        <input 
          type="date" 
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded"
          min={startDate || new Date().toISOString().split('T')[0]} // Prevent dates before start date
        />
      </div>
      
      <div className="flex gap-2 mb-6">
        <button 
          onClick={calculateTotalPrice}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!startDate || !endDate}
        >
          Calculate Total
        </button>
      </div>
      
      {totalPrice > 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <div className="text-lg font-bold">Total Price: <span className="text-green-600">${totalPrice.toFixed(2)}</span></div>
          <div className="text-sm text-gray-600">For {Math.round(totalPrice / carDetails.rate)} days</div>
        </div>
      )}
      
      <div className="flex gap-2">
        <button 
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          disabled={totalPrice <= 0}
        >
          Book Now
        </button>
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookCar;