import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmailAuth.css';

const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = 'https://emailauthentication-fbzw7sadv-rambabubades-projects.vercel.app';

  const sendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${baseURL}/send-otp`, { email });
      if (response.data.success) {
        setOtpSent(true);
      } else {
        setError(response.data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${baseURL}/verify-otp`, { email, otp });
      if (response.data.success) {
        navigate('/home');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="glass-effect max-w-md w-full p-6 rounded-md shadow-md">
        {!otpSent ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Enter Your Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              disabled={loading}
              aria-label="Email Input"
            />
            <button
              onClick={sendOtp}
              className="w-full p-2 bg-blue-500 text-white rounded"
              disabled={loading || !email}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Enter the OTP Sent to Your Email</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              disabled={loading}
              aria-label="OTP Input"
            />
            <button
              onClick={verifyOtp}
              className="w-full p-2 bg-blue-500 text-white rounded"
              disabled={loading || !otp}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailAuth;
