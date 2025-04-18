'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { registerUser } from '../../../redux/user/authSlice';

export default function BuyerRegisterPage() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ ...form, name: `${form.firstName} ${form.lastName}`, role: 'buyer' }));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register as Buyer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
}
