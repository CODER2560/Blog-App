import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './LoginForm.scss';
import { useNavigate } from 'react-router-dom';
const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Store user data or token if needed
      localStorage.setItem('user', JSON.stringify(data));
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Typography variant="h4" className="form-title">
          Welcome Back
        </Typography>
        <Typography variant="body1" className="form-subtitle">
          Sign in to continue to your blog
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
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
            fullWidth
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
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            Sign In
          </Button>

          <div className="forgot-password">
            <Link href="#" underline="hover">
              Forgot your password?
            </Link>
          </div>

          <div className="signup-link">
            Don't have an account?
            <Link href="/register" underline="hover">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;