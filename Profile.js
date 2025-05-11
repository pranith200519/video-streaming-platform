import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #1e3c72;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.8rem;
`;

const UserEmail = styled.p`
  margin: 0.5rem 0 0;
  color: #666;
  font-size: 1.1rem;
`;

const InfoSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #333;
`;

const BackButton = styled.button`
  background: #1e3c72;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  
  &:hover {
    background: #2a5298;
  }
`;

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [loginTime, setLoginTime] = useState('');

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    const loginTimeStr = localStorage.getItem('loginTime');
    
    if (email) {
      setUserEmail(email);
    }
    
    if (loginTimeStr) {
      setLoginTime(new Date(loginTimeStr).toLocaleString());
    }
  }, []);

  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0];
    return parts.charAt(0).toUpperCase();
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Header>
          <Avatar>{getInitials(userEmail)}</Avatar>
          <UserInfo>
            <UserName>{userEmail.split('@')[0]}</UserName>
            <UserEmail>{userEmail}</UserEmail>
          </UserInfo>
        </Header>

        <InfoSection>
          <SectionTitle>Account Information</SectionTitle>
          <InfoItem>
            <InfoLabel>Username</InfoLabel>
            <InfoValue>{userEmail.split('@')[0]}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{userEmail}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Login Time</InfoLabel>
            <InfoValue>{loginTime}</InfoValue>
          </InfoItem>
        </InfoSection>

        <BackButton onClick={handleBack}>Back to Home</BackButton>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile; 