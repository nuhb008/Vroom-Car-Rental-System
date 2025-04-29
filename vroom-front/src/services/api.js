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
export const getCustomerBookings = async (customerId) => axios.get(`${API_URL}/bookings/customer/${customerId}`);

//Payment APIs
export const getAllPayments = async () => axios.get(`${API_URL}/payments`);
export const getPaymentById = async (id) => axios.get(`${API_URL}/payments/${id}`);
export const createPayment = async (payment) => axios.post(`${API_URL}/payments`, payment);
export const updatePayment = async (id, payment) => axios.put(`${API_URL}/payments/${id}`, payment);
export const deletePayment = async (id) => axios.delete(`${API_URL}/payments/${id}`);
export const getPaymentsByRentId = async (rentId) => axios.get(`${API_URL}/payments/rent/${rentId}`);
export const getPaymentsByDateRange = async (startDate, endDate) =>axios.get(`${API_URL}/payments/daterange?start=${startDate}&end=${endDate}`);
export const getPaymentsByStatus = async (status) => axios.get(`${API_URL}/payments/status/${status}`);

// INSURANCE APIs
export const getAllInsurance = async () => axios.get(`${API_URL}/insurance`);
export const getInsuranceById = async (id) => axios.get(`${API_URL}/insurance/${id}`);
export const createInsurance = async (insurance) => axios.post(`${API_URL}/insurances`, insurance);
export const updateInsurance = async (id, insurance) => axios.put(`${API_URL}/insurance/${id}`, insurance);
export const deleteInsurance = async (id) => axios.delete(`${API_URL}/insurance/${id}`);
export const getInsuranceByRegNo = async (regNo) => axios.get(`${API_URL}/insurance/regno/${regNo}`);

// Rentals API
export const getAllRentals = async () => axios.get(`${API_URL}/rentals`);
export const getRentalById = async (id) => axios.get(`${API_URL}/rentals/${id}`);
export const createRental = async (rental) => axios.post(`${API_URL}/rentals`, rental);
export const updateRental = async (id, rental) => axios.put(`${API_URL}/rentals/${id}`, rental);
export const deleteRental = async (id) => axios.delete(`${API_URL}/rentals/${id}`);
export const getRentalsByStatus = async (status) => axios.get(`${API_URL}/rentals/status/${status}`);
export const getRentalsByCustomerId = async (customerId) => axios.get(`${API_URL}/rentals/customer/${customerId}`);

//Image APIs
const IMAGE_API_URL = `${API_URL}/images`;

export const uploadImage = async (regNo, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${IMAGE_API_URL}/upload/${regNo}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllImages = async () => axios.get(`${IMAGE_API_URL}`);
export const getImageById = async (id) => axios.get(`${IMAGE_API_URL}/${id}`);
export const viewImage = async (id) => axios.get(`${IMAGE_API_URL}/view/${id}`, {
  responseType: 'arraybuffer', // For rendering image binary as base64
});
export const getImagesByRegNo = async (regNo) => axios.get(`${IMAGE_API_URL}/regNo/${regNo}`);
export const updateImage = async (id, imageData) => axios.put(`${IMAGE_API_URL}/${id}`, imageData);
export const deleteImage = async (id) => axios.delete(`${IMAGE_API_URL}/${id}`);