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