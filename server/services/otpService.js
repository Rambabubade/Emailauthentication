const nodemailer = require('nodemailer');

// Function to generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

// Function to store OTP (In-memory example, replace with actual database logic)
const otpStore = {}; // This is an example; use a real database for production

const storeOtp = (email, otp) => {
  otpStore[email] = otp;
};

// Function to verify OTP
const verifyOtp = (email, otp) => {
  return otpStore[email] === otp;
};

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rambabubade1@gmail.com',
    pass: 'dueu aguf nsic vsgg',
  },
});

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'rambabubade1@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is ${otp}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error.message);
    throw error;
  }
};

module.exports = { generateOtp, storeOtp, verifyOtp, sendOtpEmail };
