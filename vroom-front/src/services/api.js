import axios from "axios";

const API_URL = "http://localhost:8081";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
}
export const getUsers = async () => axios.get(`${API_URL}/users`);
export const getUserById = async (id) => axios.get(`${API_URL}/users/${id}`);
export const deleteCar = async (regNo) => axios.delete(`${API_URL}/cars/regno/${regNo}`);
export const getCarsByStatus = async (status) => axios.get(`${API_URL}/cars/${status}`);
export const getCarsByOwner = async (id) => axios.get(`${API_URL}/cars/${id}`);
export const getCarsByFuel = async (fuel) => axios.get(`${API_URL}/cars/fueltype/${fuel}`);
export const getAllCars = async () => axios.get(`${API_URL}/cars`);
export const getCarByRegNo = async (regNo) => axios.get(`${API_URL}/cars/regno/${regNo}`);
export const updateCar = async (regNo, car) => axios.put(`${API_URL}/cars/regno/${regNo}`, car);
export const getAllBookings = async () => axios.get(`${API_URL}/bookings`);
export const createBooking = async (booking) => axios.post(`${API_URL}/bookings`, booking);
export const updateBooking = async (id, booking) => axios.put(`${API_URL}/bookings/${id}`, booking);

export const getAllPayments = async () => axios.get(`${API_URL}/payments`);
export const getPaymentById = async (id) => axios.get(`${API_URL}/payments/${id}`);
export const createPayment = async (payment) => axios.post(`${API_URL}/payments`, payment);
export const updatePayment = async (id, payment) => axios.put(`${API_URL}/payments/${id}`, payment);
export const deletePayment = async (id) => axios.delete(`${API_URL}/payments/${id}`);
export const getPaymentsByRentId = async (rentId) => axios.get(`${API_URL}/payments/rent/${rentId}`);
export const getPaymentsByDateRange = async (startDate, endDate) =>axios.get(`${API_URL}/payments/daterange?start=${startDate}&end=${endDate}`);
export const getPaymentsByStatus = async (status) => axios.get(`${API_URL}/payments/status/${status}`);