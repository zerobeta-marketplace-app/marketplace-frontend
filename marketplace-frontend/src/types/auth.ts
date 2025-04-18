export interface LoginRequest {
    email: string;
    password: string;
    role: any; 

  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken?: string; // Optional, in case you implement refresh tokens later
    user: {
      id: number;
      email: string;
      role: 'buyer' | 'seller';
      firstName: string;
      lastName: string;
    };
  }
  
  export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string; // Added role as an optional property
  }
  
  export interface RegisterResponse {
    message: string;
  }
  

  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
  }
  
  // Added AuthState export
  export interface AuthState {
    user: { id: string; name: string; email: string } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }