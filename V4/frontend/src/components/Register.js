import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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
    axios.post('http://localhost:5000/register', formData)
      .then(response => {
        console.log(response.data);
        navigate('/login');

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
      <ContentSection>
        <IntroColumn>
          <IntroContent>
            <Logo>Komodal</Logo>
            <WelcomeMessage>
              Welcome.
              <br />
              Start your journey now with our management system!
            </WelcomeMessage>
          </IntroContent>
        </IntroColumn>
        <FormColumn>
          <RegistrationForm onSubmit={handleSubmit}>
            <Header>Create an account</Header>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <FormInput type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <FormInput type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput type="email" name="email" placeholder="Email" onChange={handleChange} />
            <FormLabel htmlFor="password">Password</FormLabel>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <EyeIcon
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4645b0ba159c25103a9e30993db2d723a6479d8603712d3d88f07c30f6a52f04?apiKey=028fd953bda84a09b70b04f0ae00a5ec&"
                alt="eye icon"
                onClick={togglePasswordVisibility} 
              />
            </PasswordWrapper>
            <SubmitButton type="submit">Create account</SubmitButton>
            <FooterSection>
              <FooterText>Already have an account ?</FooterText>
              <FooterLink href="/login">Log in</FooterLink>
            </FooterSection>
          </RegistrationForm>
        </FormColumn>
      </ContentSection>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  background-color: var(--background-mode, #fff);
`;

const ContentSection = styled.section`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const IntroColumn = styled.aside`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;
  margin-left: 0;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const IntroContent = styled.div`
  background: linear-gradient(0deg, #050a24 0%, #050a24 100%), #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 47px 67px 80px;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const Logo = styled.h1`
  color: #fff;
  font: italic 700 28px/100% Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const WelcomeMessage = styled.p`
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.44) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 422px;
  font: italic 300 56px/67px Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
    font-size: 40px;
    line-height: 54px;
  }
`;

const FormColumn = styled.section`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 34%;
  margin-left: 170px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const RegistrationForm = styled.form`
  justify-content: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  margin: auto 0;
  padding: 0 20px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Header = styled.h2`
  color: var(--foreground-high, #101828);
  font: 600 28px Poppins, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FormLabel = styled.label`
  color: var(--foreground-default, #344054);
  font-family: Poppins, sans-serif;
  text-transform: capitalize;
  margin-top: 32px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FormInput = styled.input`
  border-radius: 8px;
  border: 3px solid rgba(209, 233, 255, 1);
  margin-top: 12px;
  color: var(--foreground-default, #344054);
  white-space: nowrap;
  padding: 12px 16px;
  font: 14px Poppins, sans-serif;
  @media (max-width: 991px) {
    padding-right: 20px;
    white-space: initial;
  }
`;

const PasswordWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(208, 213, 221, 1);
  display: flex;
  margin-top: 12px;
  gap: 5px;
  font-size: 14px;
  color: var(--foreground-low, #98a2b3);
  white-space: nowrap;
  padding: 12px 16px;
  align-items: center; /* Aligne verticalement le contenu */
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding-right: 20px;
    white-space: initial;
  }
`;

const PasswordInput = styled(FormInput)`
  border: none;
  flex: 1;
  margin: 0;
`;

const EyeIcon = styled.img`
  cursor: pointer;
  width: 24px;
`;

const SubmitButton = styled.button`
  font-family: Poppins, sans-serif;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: var(--container-primary, #1570ef);
  margin-top: 32px;
  color: var(--foreground-onColor, #fcfcfd);
  font-weight: 600;
  padding: 16px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const FooterSection = styled.footer`
  align-self: center;
  display: flex;
  margin-top: 24px;
  gap: 8px;
  text-transform: capitalize;
`;

const FooterText = styled.p`
  color: var(--foreground-low, #98a2b3);
  font-family: Poppins, sans-serif;
`;

const FooterLink = styled.a`
  color: var(--foreground-primary, #1570ef);
  cursor: pointer;
  text-decoration: underline;
  margin-top: 13px; /* Ajuste le décalage du lien */
`;

export default Register;
