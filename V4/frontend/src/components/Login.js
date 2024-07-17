import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', formData)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard/home'); 
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainContainer>
      <FormContainer>
        <FormTitle>Login to your account</FormTitle>
        <LoginForm onSubmit={handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <InputField
            type="email"
            id="email"
            name="email"
            placeholder="balamia@gmail.com"
            onChange={handleChange}
          />
          <PasswordContainer>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            
          </PasswordContainer>
          <LoginButton type="submit">Login now</LoginButton>
        </LoginForm>
        <SignupContainer>
          <SignupText>Don't have an account?</SignupText>
          <SignupLink href="/register">Sign up</SignupLink>
        </SignupContainer>
      </FormContainer>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  background-color: #050a24;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const FormContainer = styled.section`
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 540px;
  max-width: 100%;
  padding: 48px 72px;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const FormTitle = styled.h1`
  color: #101828;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 28px;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Label = styled.label`
  color: #344054;
  font-family: Poppins, sans-serif;
  text-transform: capitalize;
`;

const InputField = styled.input`
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 1);
  padding: 12px 16px;
  font-family: Poppins, sans-serif;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PasswordInput = styled(InputField)`
  border: none;
`;

const EyeIcon = styled.img`
  width: 24px;
  object-fit: cover;
  cursor: pointer;
`;

const LoginButton = styled.button`
  font-family: Poppins, sans-serif;
  font-weight: 600;
  color: #fcfcfd;
  border-radius: 8px;
  background-color: #1570ef;
  justify-content: center;
  padding: 16px;
  cursor: pointer;
`;

const SignupContainer = styled.div`
  align-self: center;
  display: flex;
  gap: 8px;
  margin-top: 24px;
  text-transform: capitalize;
`;

const SignupText = styled.p`
  color: #98a2b3;
  font-family: Poppins, sans-serif;
`;

const SignupLink = styled.a`
  color: #1570ef;
  font-family: Poppins, sans-serif;
  margin-top: 13px;
`;

export default Login;
