import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaLink, FaArrowLeft } from 'react-icons/fa';
import movieVideos from '../data/movieVideos';
import educationalAndSportsVideos from '../data/educationalAndSportsVideos';

const PlayerContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  background: #000;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${VideoContainer}:hover & {
    opacity: 1;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  position: relative;

  &:hover {
    height: 6px;
  }
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #e50914;
  border-radius: 2px;
  width: ${props => props.progress}%;
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: #e50914;
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VolumeSlider = styled.input`
  width: 100px;
  -webkit-appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const TimeDisplay = styled.div`
  color: white;
  font-size: 14px;
`;

const ShareButton = styled(Button)`
  margin-left: auto;
`;

const ShareMenu = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #1a1a1a;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ShareOption = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CopyMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  animation: fadeInOut 2s ease;

  @keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${props => props.category === 'education' ? '#4CAF50' : '#2196F3'};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
`;

const VideoDescription = styled.div`
  position: absolute;
  bottom: 100px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 4px;
  color: white;
  max-width: 600px;
`;

function Player() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    if (location.state?.movieData) {
      setMovieData(location.state.movieData);
    }
  }, [location.state]);

  const getVideoUrl = () => {
    try {
      if (movieData?.category === 'education') {
        return educationalAndSportsVideos.education[id]?.url;
      } else if (movieData?.category === 'sports') {
        return educationalAndSportsVideos.sports[id]?.url;
      }
      return movieVideos[id] || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    } catch (error) {
      console.error('Error getting video URL:', error);
      return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleShare = (platform) => {
    const videoUrl = window.location.href;
    const shareText = `Check out this video: ${movieData?.title || 'Amazing video'}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(videoUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + videoUrl)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(videoUrl);
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 2000);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  const handleBack = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate('/home');
  };

  const handleError = () => {
    setError('Failed to load video. Please try another one.');
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <PlayerContainer>
      <BackButton onClick={handleBack}>
        <FaArrowLeft /> Back to Home
      </BackButton>

      {movieData?.category && (
        <CategoryBadge category={movieData.category}>
          {movieData.category === 'education' ? 'Education' : 'Sports'}
        </CategoryBadge>
      )}

      <VideoContainer>
        <Video
          ref={videoRef}
          src={getVideoUrl()}
          onTimeUpdate={handleTimeUpdate}
          onError={handleError}
          autoPlay
        />
        
        {error ? (
          <ErrorMessage>
            <h3>Error</h3>
            <p>{error}</p>
            <Button onClick={handleBack}>Go Back</Button>
          </ErrorMessage>
        ) : (
          <Controls>
            <ProgressBar onClick={handleProgressClick}>
              <Progress progress={progress} />
            </ProgressBar>
            
            <ControlButtons>
              <Button onClick={handlePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </Button>
              
              <VolumeContainer>
                <Button onClick={handleMute}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </Button>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </VolumeContainer>
              
              <TimeDisplay>
                {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'} / 
                {videoRef.current ? formatTime(videoRef.current.duration) : '0:00'}
              </TimeDisplay>
              
              <ShareButton onClick={() => setShowShareMenu(!showShareMenu)}>
                <FaShare />
                {showShareMenu && (
                  <ShareMenu>
                    <ShareOption onClick={() => handleShare('facebook')}>
                      <FaFacebook /> Share on Facebook
                    </ShareOption>
                    <ShareOption onClick={() => handleShare('twitter')}>
                      <FaTwitter /> Share on Twitter
                    </ShareOption>
                    <ShareOption onClick={() => handleShare('whatsapp')}>
                      <FaWhatsapp /> Share on WhatsApp
                    </ShareOption>
                    <ShareOption onClick={() => handleShare('copy')}>
                      <FaLink /> Copy Link
                    </ShareOption>
                  </ShareMenu>
                )}
              </ShareButton>
              
              <Button onClick={handleFullscreen}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </Button>
            </ControlButtons>
          </Controls>
        )}

        {movieData?.description && (
          <VideoDescription>
            <h3>{movieData.title}</h3>
            <p>{movieData.description}</p>
          </VideoDescription>
        )}
      </VideoContainer>

      {showCopyMessage && (
        <CopyMessage>
          Link copied to clipboard!
        </CopyMessage>
      )}
    </PlayerContainer>
  );
}

export default Player;
