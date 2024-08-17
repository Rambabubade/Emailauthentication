import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmailAuth.css'; // Assuming this is the file where your CSS is defined

const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      if (response.data.success) {
        setOtpSent(true);
        setError('');
      } else {
        setError(response.data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      if (response.data.success) {
        setError('');
        navigate('/home'); // Redirect to home page
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="glass-effect max-w-md w-full">
        {!otpSent ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Enter your email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button onClick={sendOtp} className="w-full p-2 bg-blue-500 text-white rounded">
              Send OTP
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Enter the OTP sent to your email</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button onClick={verifyOtp} className="w-full p-2 bg-blue-500 text-white rounded">
              Verify OTP
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailAuth;
