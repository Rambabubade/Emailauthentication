const { generateOtp, storeOtp, verifyOtp, sendOtpEmail } = require('../services/otpService');

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = generateOtp();
    storeOtp(email, otp); // Store OTP for verification later
  
    try {
      await sendOtpEmail(email, otp);
      res.json({ success: true });
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      res.json({ success: false, error: error.message });
    }
  };
  
  

  exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;
  
    if (verifyOtp(email, otp)) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: 'Invalid OTP' });
    }
  };
  
