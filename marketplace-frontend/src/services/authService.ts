import axios from 'axios';
import { LoginRequest, RegisterRequest } from '../types/auth';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_BASE_URL;

const login = (data: LoginRequest) => {
  console.log('Login data:', data);
  return axios.post(`${AUTH_API_URL}/auth/login`, data);
};

const register = (data: RegisterRequest) => {
  return axios.post(`${USER_API_URL}/users`, data);
};

const authService = {
  login,
  register,
};

export default authService;
