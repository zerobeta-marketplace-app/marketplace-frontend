import axios from 'axios';
import { LoginRequest, RegisterRequest } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const login = (data: LoginRequest) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

const register = (data: RegisterRequest) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

const authService = {
  login,
  register,
};

export default authService;
