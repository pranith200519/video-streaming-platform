import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LivestreamContainer = styled.div`
  min-height: 100vh;
  background: #141414;
  color: white;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StreamContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  height: calc(100vh - 150px);
`;

const VideoSection = styled.div`
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.primary ? '#e50914' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? '#ff0f1a' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const ChatSection = styled.div`
  background: #1f1f1f;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: #333;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    background: #444;
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #e50914;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff0f1a;
  }
`;

function Livestream() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const startStreaming = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsStreaming(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopStreaming = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsStreaming(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, {
        user: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setChatMessage('');
    }
  };

  return (
    <LivestreamContainer>
      <Header>
        <Title>Livestream</Title>
        <BackButton onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </BackButton>
      </Header>

      <StreamContainer>
        <VideoSection>
          <VideoPreview ref={videoRef} autoPlay muted playsInline />
          <Controls>
            <ControlButton
              primary={!isStreaming}
              onClick={isStreaming ? stopStreaming : startStreaming}
            >
              <i className={`fas fa-${isStreaming ? 'stop' : 'play'}`}></i>
              {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
            </ControlButton>
            <ControlButton>
              <i className="fas fa-microphone"></i>
              Mute
            </ControlButton>
            <ControlButton>
              <i className="fas fa-video"></i>
              Camera
            </ControlButton>
          </Controls>
        </VideoSection>

        <ChatSection>
          <ChatMessages>
            {chatMessages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <strong>{msg.user}</strong> ({msg.timestamp}): {msg.message}
              </div>
            ))}
          </ChatMessages>
          <ChatInput>
            <Input
              type="text"
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <SendButton onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </SendButton>
          </ChatInput>
        </ChatSection>
      </StreamContainer>
    </LivestreamContainer>
  );
}

export default Livestream; 