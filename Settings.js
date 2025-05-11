import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SettingsContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.8rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const SettingLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SettingName = styled.span`
  color: #333;
  font-weight: 500;
`;

const SettingDescription = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 120px;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #1e3c72;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
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

function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    downloadQuality: 'high',
    downloadLocation: 'default',
    networkMode: 'auto',
    wifiOnly: true,
    notifications: {
      newVideos: true,
      downloadComplete: true,
      updates: false
    }
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleNotificationChange = (notification) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [notification]: !prev.notifications[notification]
      }
    }));
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <SettingsContainer>
      <SettingsCard>
        <Header>
          <Title>Settings</Title>
        </Header>

        <Section>
          <SectionTitle>📥 Download Settings</SectionTitle>
          <SettingItem>
            <SettingLabel>
              <SettingName>Download Quality</SettingName>
              <SettingDescription>Choose the quality of downloaded videos</SettingDescription>
            </SettingLabel>
            <Select 
              value={settings.downloadQuality}
              onChange={(e) => handleSettingChange('downloadQuality', e.target.value)}
            >
              <option value="low">Low (480p)</option>
              <option value="medium">Medium (720p)</option>
              <option value="high">High (1080p)</option>
              <option value="ultra">Ultra (4K)</option>
            </Select>
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              <SettingName>Download Location</SettingName>
              <SettingDescription>Choose where to save downloaded videos</SettingDescription>
            </SettingLabel>
            <Select 
              value={settings.downloadLocation}
              onChange={(e) => handleSettingChange('downloadLocation', e.target.value)}
            >
              <option value="default">Default</option>
              <option value="custom">Custom Location</option>
            </Select>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>🌐 Network Settings</SectionTitle>
          <SettingItem>
            <SettingLabel>
              <SettingName>Network Mode</SettingName>
              <SettingDescription>Choose how to handle network connections</SettingDescription>
            </SettingLabel>
            <Select 
              value={settings.networkMode}
              onChange={(e) => handleSettingChange('networkMode', e.target.value)}
            >
              <option value="auto">Auto</option>
              <option value="wifi">WiFi Only</option>
              <option value="mobile">Mobile Data</option>
            </Select>
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              <SettingName>WiFi Only Downloads</SettingName>
              <SettingDescription>Only download videos when connected to WiFi</SettingDescription>
            </SettingLabel>
            <Toggle>
              <input
                type="checkbox"
                checked={settings.wifiOnly}
                onChange={() => handleSettingChange('wifiOnly', !settings.wifiOnly)}
              />
              <span></span>
            </Toggle>
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>🔔 Notifications</SectionTitle>
          <SettingItem>
            <SettingLabel>
              <SettingName>New Videos</SettingName>
              <SettingDescription>Get notified about new videos from your subscriptions</SettingDescription>
            </SettingLabel>
            <Toggle>
              <input
                type="checkbox"
                checked={settings.notifications.newVideos}
                onChange={() => handleNotificationChange('newVideos')}
              />
              <span></span>
            </Toggle>
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              <SettingName>Download Complete</SettingName>
              <SettingDescription>Get notified when downloads are complete</SettingDescription>
            </SettingLabel>
            <Toggle>
              <input
                type="checkbox"
                checked={settings.notifications.downloadComplete}
                onChange={() => handleNotificationChange('downloadComplete')}
              />
              <span></span>
            </Toggle>
          </SettingItem>
          <SettingItem>
            <SettingLabel>
              <SettingName>App Updates</SettingName>
              <SettingDescription>Get notified about app updates and new features</SettingDescription>
            </SettingLabel>
            <Toggle>
              <input
                type="checkbox"
                checked={settings.notifications.updates}
                onChange={() => handleNotificationChange('updates')}
              />
              <span></span>
            </Toggle>
          </SettingItem>
        </Section>

        <BackButton onClick={handleBack}>Back to Home</BackButton>
      </SettingsCard>
    </SettingsContainer>
  );
}

export default Settings; 