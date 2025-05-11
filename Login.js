import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #2a5298;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #2a5298;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #1e3c72;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  text-align: center;
  margin-top: 1rem;
`;

const SignupLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #2a5298;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: right;
  margin-top: 0.5rem;
  color: #2a5298;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CaptchaContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  text-align: center;
`;

const CaptchaText = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 3px;
  color: #333;
  background: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  user-select: none;
`;

const CaptchaInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  text-transform: uppercase;
  
  &:focus {
    outline: none;
    border-color: #2a5298;
  }
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: #2a5298;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  });
  const [error, setError] = useState('');
  const [captchaText, setCaptchaText] = useState('');

  // Get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // Generate a random 6-character captcha
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const refreshCaptcha = (e) => {
    e.preventDefault();
    setCaptchaText(generateCaptcha());
    setFormData(prevState => ({
      ...prevState,
      captcha: ''
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.captcha) {
      setError('Please fill in all fields');
      return;
    }

    // Validate CAPTCHA (case-insensitive)
    if (formData.captcha.trim().toLowerCase() !== captchaText.toLowerCase()) {
      setError('Invalid CAPTCHA. Please try again.');
      setCaptchaText(generateCaptcha());
      setFormData(prevState => ({
        ...prevState,
        captcha: ''
      }));
      return;
    }

    const users = getUsers();
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    try {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('loginTime', new Date().toISOString());
      window.location.href = '/home';
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Video Streaming</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <CaptchaContainer>
          <CaptchaText>{captchaText}</CaptchaText>
          <CaptchaInput
            type="text"
            name="captcha"
            placeholder="Enter CAPTCHA"
            value={formData.captcha}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <RefreshButton type="button" onClick={refreshCaptcha}>
            Refresh CAPTCHA
          </RefreshButton>
        </CaptchaContainer>
        <ForgotPasswordLink to="/forgot-password">Forgot Password?</ForgotPasswordLink>
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SignupLink to="/signup">Don't have an account? Sign up</SignupLink>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login; 