import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './RegisterForm.scss';

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    profession: '',
    state: '',
    country: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Basic client-side validation
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  for (const key in formData) {
    if ((formData as any)[key] === "") {
      alert("Please fill all fields.");
      return;
    }
  }

  try {
    const response = await fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    alert("Registration successful!");
    // Optionally redirect or clear form here
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Please try again.");
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-container">
      <div className="image-section">
        <div className="overlay-text">
          <h2>Join Our Community</h2>
          <p>Create an account to start sharing your stories and connect with other writers</p>
        </div>
      </div>

      <div className="form-section">
        <div className="register-form">
          <Typography variant="h4" className="form-title">
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-field"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="register-button"
            >
              Create Account
            </Button>

            <div className="login-link">
              Already have an account?
              <Link href="/" underline="hover">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;