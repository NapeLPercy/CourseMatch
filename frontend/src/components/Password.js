import React, { useState } from 'react';
import AuthCard from './AuthCard';

export default function ForgotPassword() {
  const [form, setForm] = useState({ password: '', retypePassword: '' });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.retypePassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('New password:', form.password);
    // Later, send this to backend via API call
  };

  return (
    <AuthCard title='Reset Password'>
            <a href="/login">back</a>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
        
          <label className='form-label'>New Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={form.password}
            onChange={handleInput}
            placeholder='Enter new password'
            required
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Retype Password</label>
          <input
            type='password'
            name='retypePassword'
            className='form-control'
            value={form.retypePassword}
            onChange={handleInput}
            placeholder='Retype your password'
            required
          />
        </div>

        <button type='submit' className='btn btn-primary w-100'>
          Update Password
        </button>
      </form>
    </AuthCard>
  );
}
