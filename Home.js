import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare, FaUser, FaPlay, FaGraduationCap, FaRunning } from 'react-icons/fa';
import movies from '../data/movies';
import ChannelList from '../components/ChannelList';
import educationalAndSportsVideos from '../data/educationalAndSportsVideos';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
`;

const Navbar = styled.nav`
  background: #1e3c72;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: white;
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  width: 300px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
  }
`;

const UserProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2a5298;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const UserName = styled.span`
  color: white;
  font-size: 1rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.div`
  padding: 0.8rem 1rem;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 0.5rem 0;
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #000000;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MovieCard = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MovieThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
  
  svg {
    color: white;
    font-size: 24px;
  }
  
  ${MovieThumbnail}:hover & {
    opacity: 1;
  }
`;

const MovieInfo = styled.div`
  padding: 1rem;
  background: #1a1a1a;
`;

const MovieTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MovieMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
`;

const MovieDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.span`
  color: #f5c518;
  font-weight: bold;
`;

const LanguageTag = styled.span`
  background: ${props => {
    switch(props.language) {
      case 'English': return '#1e3c72';
      case 'Hindi': return '#e50914';
      case 'Telugu': return '#00a8e1';
      default: return '#666';
    }
  }};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const GenreTag = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.primary ? '#e50914' : 'transparent'};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: ${props => props.primary ? 'none' : '1px solid white'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? '#ff0f1a' : 'rgba(255,255,255,0.1)'};
  }
`;

const MovieActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.primary ? '#e50914' : 'transparent'};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: ${props => props.primary ? 'none' : '1px solid white'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? '#ff0f1a' : 'rgba(255,255,255,0.1)'};
  }
`;

const UploadModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  background: ${props => props.primary ? '#e50914' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};

  &:hover {
    background: ${props => props.primary ? '#ff0f1a' : '#e5e5e5'};
  }
`;

const CarouselSection = styled.div`
  margin-bottom: 3rem;
`;

const CarouselTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  background: #000;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  background: #1e3c72;
`;

const CarouselOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
`;

const CarouselMovieTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const CarouselMovieInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
`;

const CarouselButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 1;
`;

const Indicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#e50914' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#e50914' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const CategorySection = styled.div`
  margin: 40px 0;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 20px;

  h2 {
    font-size: 24px;
    color: #ffffff;
    margin: 0;
  }

  svg {
    font-size: 24px;
    color: ${props => props.category === 'education' ? '#4CAF50' : '#2196F3'};
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
`;

const VideoCard = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  background: #000;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoInfo = styled.div`
  padding: 15px;
`;

const VideoTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 8px;
`;

const VideoDescription = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryBadge = styled.span`
  background: ${props => props.category === 'education' ? '#4CAF50' : '#2196F3'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const ChannelVideosSection = styled.div`
  margin: 40px 0;
  padding: 0 20px;
`;

const ChannelVideosHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ChannelVideosTitle = styled.h2`
  font-size: 24px;
  color: white;
  margin: 0;
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const VideoThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoDuration = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

const VideoStats = styled.div`
  display: flex;
  gap: 10px;
  color: #ccc;
  font-size: 14px;
  margin: 8px 0;
`;

const VideoActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const VideoActionButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.liked {
    color: #4CAF50;
  }

  &.disliked {
    color: #f44336;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ChannelAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ChannelName = styled.span`
  color: #ccc;
  font-size: 14px;
`;

const ChannelLink = styled.div`
  cursor: pointer;
  &:hover {
    color: #4CAF50;
  }
`;

const CategoryContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const MovieRow = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieCardHorizontal = styled.div`
  display: flex;
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  min-width: 300px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const MovieImageHorizontal = styled.div`
  width: 120px;
  height: 180px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MovieInfoHorizontal = styled.div`
  padding: 15px;
  flex: 1;
`;

const MovieTitleHorizontal = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 8px;
`;

const MovieMetaHorizontal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

const SearchResults = styled.div`
  padding: 20px;
`;

const SearchResultsHeader = styled.div`
  margin-bottom: 20px;
`;

const SearchResultsTitle = styled.h2`
  color: #ffffff;
  margin: 0;
  font-size: 24px;
`;

const SearchResultsCount = styled.p`
  color: #ffffff;
  margin: 5px 0 0 0;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: #ffffff;
`;

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [channelVideos, setChannelVideos] = useState([
    {
      id: 1,
      title: "My First Video",
      thumbnail: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg",
      views: "1.2K",
      likes: 150,
      dislikes: 5,
      duration: "10:30",
      channelName: "Channel Name",
      channelAvatar: "https://via.placeholder.com/24",
      uploadDate: "2 days ago",
      isLiked: false,
      isDisliked: false
    },
    {
      id: 2,
      title: "Channel Introduction",
      thumbnail: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
      views: "3.5K",
      likes: 320,
      dislikes: 12,
      duration: "15:45",
      channelName: "Channel Name",
      channelAvatar: "https://via.placeholder.com/24",
      uploadDate: "1 week ago",
      isLiked: false,
      isDisliked: false
    }
  ]);
  const [showShareMenu, setShowShareMenu] = useState(null);
  const [showComments, setShowComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState({
    1: [
      {
        id: 1,
        author: 'John Doe',
        text: 'Great video! Really enjoyed watching this.',
        date: '2 days ago',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        author: 'Jane Smith',
        text: 'Thanks for sharing this content!',
        date: '1 day ago',
        likes: 3,
        isLiked: false
      }
    ],
    2: [
      {
        id: 3,
        author: 'Mike Johnson',
        text: 'Awesome channel introduction!',
        date: '3 days ago',
        likes: 7,
        isLiked: false
      }
    ]
  });

  // Get random movies for the carousel
  const getRandomMovies = () => {
    // Create a copy of the movies array
    const moviesCopy = [...movies];
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = moviesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
    }
    // Get unique movies by checking their IDs
    const uniqueMovies = [];
    const usedIds = new Set();
    
    for (const movie of moviesCopy) {
      if (!usedIds.has(movie.id)) {
        uniqueMovies.push(movie);
        usedIds.add(movie.id);
        if (uniqueMovies.length === 5) break;
      }
    }
    
    return uniqueMovies;
  };

  const carouselMovies = getRandomMovies();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselMovies.length) % carouselMovies.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0];
    return parts.charAt(0).toUpperCase();
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleLivestreamClick = () => {
    navigate('/livestream');
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the file upload
    console.log('Upload data:', uploadData);
    setShowUploadModal(false);
    setUploadData({ title: '', description: '', file: null });
  };

  const handleFileChange = (e) => {
    setUploadData({
      ...uploadData,
      file: e.target.files[0]
    });
  };

  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const getMoviesByCategory = (category) => {
    if (category === 'Recent') {
      return [...movies].sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 10);
    }
    return movies.filter(movie => movie.genre === category);
  };

  const categories = [
    { id: 'recent', title: 'Recent Movies', type: 'Recent' },
    { id: 'sports', title: 'Sports Movies', type: 'Sports' },
    { id: 'musicvideos', title: 'Music Videos', type: 'Music Video' },
    { id: 'crime', title: 'Crime Movies', type: 'Crime' },
    { id: 'romance', title: 'Romance Movies', type: 'Romance' },
    { id: 'horror', title: 'Horror Movies', type: 'Horror' }
  ];

  const handleVideoLike = (videoId) => {
    setChannelVideos(videos => videos.map(video => {
      if (video.id === videoId) {
        const newIsLiked = !video.isLiked;
        const newIsDisliked = newIsLiked ? false : video.isDisliked;
        return {
          ...video,
          isLiked: newIsLiked,
          isDisliked: newIsDisliked,
          likes: newIsLiked ? video.likes + 1 : video.likes - 1,
          dislikes: newIsDisliked ? video.dislikes - 1 : video.dislikes
        };
      }
      return video;
    }));
  };

  const handleVideoDislike = (videoId) => {
    setChannelVideos(videos => videos.map(video => {
      if (video.id === videoId) {
        const newIsDisliked = !video.isDisliked;
        const newIsLiked = newIsDisliked ? false : video.isLiked;
        return {
          ...video,
          isDisliked: newIsDisliked,
          isLiked: newIsLiked,
          dislikes: newIsDisliked ? video.dislikes + 1 : video.dislikes - 1,
          likes: newIsLiked ? video.likes - 1 : video.likes
        };
      }
      return video;
    }));
  };

  const handleShare = (videoId, platform) => {
    const video = channelVideos.find(v => v.id === videoId);
    if (!video) return;

    const shareUrl = window.location.origin + `/video/${videoId}`;
    const shareText = `Check out this video: ${video.title}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
        break;
      default:
        break;
    }
    setShowShareMenu(null);
  };

  const handleChannelClick = (channelName) => {
    navigate(`/channel/${encodeURIComponent(channelName)}`);
  };

  const handleCommentSubmit = (videoId) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: userEmail.split('@')[0],
      text: commentText,
      date: 'Just now',
      likes: 0,
      isLiked: false
    };

    setComments(prev => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] || [])]
    }));

    setCommentText('');
  };

  const handleCommentLike = (videoId, commentId) => {
    setComments(prev => ({
      ...prev,
      [videoId]: prev[videoId].map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      })
    }));
  };

  const handlePlayMovie = (movie) => {
    // Navigate to the movie player page with the movie data
    navigate(`/player/${movie.id}`, { 
      state: { 
        movieData: movie,
        from: 'home'
      }
    });
  };

  const handlePlayVideo = (video, category) => {
    navigate(`/player/${video.id}`, {
      state: {
        movieData: {
          ...video,
          category: category
        }
      }
    });
  };

  const getThumbnailUrl = (videoUrl, category) => {
    // Education thumbnails
    const educationThumbnails = [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=300&fit=crop', // Classroom
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop', // Science
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop', // Math
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&h=300&fit=crop', // Computer
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=300&fit=crop'  // Library
    ];

    // Sports thumbnails
    const sportsThumbnails = [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop', // Basketball
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=300&fit=crop', // Football
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&h=300&fit=crop', // Tennis
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=300&fit=crop', // Swimming
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=300&fit=crop'  // Running
    ];

    // Get a consistent index based on the video URL
    const index = videoUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5;

    if (category === 'education') {
      return educationThumbnails[index];
    } else if (category === 'sports') {
      return sportsThumbnails[index];
    }

    // Fallback to a random image if category is not specified
    return `https://picsum.photos/seed/${videoUrl}/500/300`;
  };

  const renderContent = () => {
    if (searchQuery.trim()) {
      return (
        <SearchResults>
          <SearchResultsHeader>
            <SearchResultsTitle>Search Results</SearchResultsTitle>
            <SearchResultsCount>{filteredMovies.length} movies found</SearchResultsCount>
          </SearchResultsHeader>
          {filteredMovies.length > 0 ? (
            <MovieGrid>
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id}>
                  <MovieThumbnail>
                    <img src={movie.thumbnail} alt={movie.title} />
                    <PlayButton onClick={() => handlePlayMovie(movie)}>
                      <FaPlay />
                    </PlayButton>
                  </MovieThumbnail>
                  <MovieInfo>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieMeta>
                      <MovieDetails>
                        <span>{movie.year}</span>
                        <Rating>★ {movie.rating}</Rating>
                      </MovieDetails>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <LanguageTag language={movie.language}>{movie.language}</LanguageTag>
                        <GenreTag>{movie.genre}</GenreTag>
                      </div>
                    </MovieMeta>
                  </MovieInfo>
                </MovieCard>
              ))}
            </MovieGrid>
          ) : (
            <NoResults>
              <i className="fas fa-search" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
              <p>No movies found matching "{searchQuery}"</p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>Try different keywords or browse categories</p>
            </NoResults>
          )}
        </SearchResults>
      );
    }

    return (
      <>
        <CarouselSection>
          <CarouselTitle>Featured Movies</CarouselTitle>
          <CarouselContainer>
            <CarouselTrack style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carouselMovies.map((movie, index) => (
                <CarouselSlide key={movie.id}>
                  {movie.image ? (
                    <CarouselImage src={movie.image} alt={movie.title} />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: '#1e3c72',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem'
                    }}>
                      {movie.title}
                    </div>
                  )}
                  <CarouselOverlay>
                    <CarouselMovieTitle>{movie.title}</CarouselMovieTitle>
                    <CarouselMovieInfo>
                      <LanguageTag language={movie.language}>{movie.language}</LanguageTag>
                      <GenreTag>{movie.genre}</GenreTag>
                      <Rating>★ {movie.rating}</Rating>
                    </CarouselMovieInfo>
                    <PlayButton 
                      onClick={() => handlePlayMovie(movie)}
                      style={{ 
                        position: 'relative', 
                        marginTop: '1rem',
                        opacity: 1,
                        width: '50px',
                        height: '50px'
                      }}
                    >
                      <FaPlay />
                    </PlayButton>
                  </CarouselOverlay>
                </CarouselSlide>
              ))}
            </CarouselTrack>
            <CarouselControls>
              <CarouselButton onClick={prevSlide}>
                <i className="fas fa-chevron-left"></i>
              </CarouselButton>
              <CarouselButton onClick={nextSlide}>
                <i className="fas fa-chevron-right"></i>
              </CarouselButton>
            </CarouselControls>
            <CarouselIndicators>
              {carouselMovies.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === currentSlide}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </CarouselIndicators>
          </CarouselContainer>
        </CarouselSection>

        <ChannelVideosSection>
          <ChannelVideosHeader>
            <ChannelVideosTitle>Channel Videos</ChannelVideosTitle>
          </ChannelVideosHeader>
          <VideosGrid>
            {channelVideos.map(video => (
              <VideoCard key={video.id}>
                <VideoThumbnail>
                  <VideoThumbnailImage src={video.thumbnail} alt={video.title} />
                  <VideoDuration>{video.duration}</VideoDuration>
                </VideoThumbnail>
                <VideoInfo>
                  <ChannelInfo>
                    <ChannelAvatar>
                      <FaUser />
                    </ChannelAvatar>
                    <ChannelLink onClick={() => handleChannelClick(video.channelName)}>
                      <ChannelName>{video.channelName}</ChannelName>
                    </ChannelLink>
                  </ChannelInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoStats>
                    <span>{video.views} views</span>
                    <span>{video.uploadDate}</span>
                  </VideoStats>
                  <VideoActions>
                    <VideoActionButton 
                      className={video.isLiked ? 'liked' : ''}
                      onClick={() => handleVideoLike(video.id)}
                    >
                      <FaThumbsUp /> {video.likes}
                    </VideoActionButton>
                    <VideoActionButton 
                      className={video.isDisliked ? 'disliked' : ''}
                      onClick={() => handleVideoDislike(video.id)}
                    >
                      <FaThumbsDown /> {video.dislikes}
                    </VideoActionButton>
                    <VideoActionButton onClick={() => setShowComments(showComments === video.id ? null : video.id)}>
                      <FaComment /> Comment
                    </VideoActionButton>
                    <VideoActionButton 
                      onClick={() => setShowShareMenu(showShareMenu === video.id ? null : video.id)}
                      style={{ position: 'relative' }}
                    >
                      <FaShare /> Share
                      {showShareMenu === video.id && (
                        <ShareMenu>
                          <ShareOption onClick={() => handleShare(video.id, 'whatsapp')}>
                            <i className="fab fa-whatsapp"></i> WhatsApp
                          </ShareOption>
                          <ShareOption onClick={() => handleShare(video.id, 'facebook')}>
                            <i className="fab fa-facebook"></i> Facebook
                          </ShareOption>
                          <ShareOption onClick={() => handleShare(video.id, 'twitter')}>
                            <i className="fab fa-twitter"></i> Twitter
                          </ShareOption>
                          <ShareOption onClick={() => handleShare(video.id, 'telegram')}>
                            <i className="fab fa-telegram"></i> Telegram
                          </ShareOption>
                        </ShareMenu>
                      )}
                    </VideoActionButton>
                  </VideoActions>
                  {showComments === video.id && (
                    <CommentSection>
                      <CommentInput>
                        <CommentTextArea
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <CommentButton onClick={() => handleCommentSubmit(video.id)}>
                          Comment
                        </CommentButton>
                      </CommentInput>
                      <CommentsList>
                        {(comments[video.id] || []).map(comment => (
                          <Comment key={comment.id}>
                            <CommentAvatar>
                              <FaUser />
                            </CommentAvatar>
                            <CommentContent>
                              <CommentHeader>
                                <CommentAuthor>{comment.author}</CommentAuthor>
                                <CommentDate>{comment.date}</CommentDate>
                              </CommentHeader>
                              <CommentText>{comment.text}</CommentText>
                              <CommentActions>
                                <CommentActionButton onClick={() => handleCommentLike(video.id, comment.id)}>
                                  <FaThumbsUp /> {comment.likes}
                                </CommentActionButton>
                                <CommentActionButton>Reply</CommentActionButton>
                              </CommentActions>
                            </CommentContent>
                          </Comment>
                        ))}
                      </CommentsList>
                    </CommentSection>
                  )}
                </VideoInfo>
              </VideoCard>
            ))}
          </VideosGrid>
        </ChannelVideosSection>

        <ChannelList />

        {categories.map(category => (
          <CategorySection key={category.id}>
            <CategoryHeader category={category.type}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d={category.type === 'Sports' ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8-8zm1-13H11v6H9V9H7V7h4V3z" : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8-8zm1-13H11v6H9V9H7V7h4V3z"} />
              </svg>
              <h2>{category.title}</h2>
            </CategoryHeader>
            <CategoryContainer>
              <ScrollButton className="left" onClick={() => scrollLeft(category.id)}>
                <i className="fas fa-chevron-left"></i>
              </ScrollButton>
              <MovieRow id={category.id}>
                {getMoviesByCategory(category.type).map(movie => (
                  <MovieCardHorizontal key={movie.id}>
                    <MovieImageHorizontal>
                      {movie.image ? (
                        <>
                          <img src={movie.image} alt={movie.title} />
                          <PlayButton 
                            onClick={() => handlePlayMovie(movie)}
                            style={{ 
                              position: 'absolute',
                              opacity: 1,
                              width: '50px',
                              height: '50px'
                            }}
                          >
                            <FaPlay />
                          </PlayButton>
                        </>
                      ) : (
                        <div>{movie.title}</div>
                      )}
                    </MovieImageHorizontal>
                    <MovieInfoHorizontal>
                      <MovieTitleHorizontal>{movie.title}</MovieTitleHorizontal>
                      <MovieMetaHorizontal>
                        <MovieDetails>
                          <span>{movie.year}</span>
                          <Rating>★ {movie.rating}</Rating>
                        </MovieDetails>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <LanguageTag language={movie.language}>{movie.language}</LanguageTag>
                          <GenreTag>{movie.genre}</GenreTag>
                        </div>
                      </MovieMetaHorizontal>
                    </MovieInfoHorizontal>
                  </MovieCardHorizontal>
                ))}
              </MovieRow>
              <ScrollButton className="right" onClick={() => scrollRight(category.id)}>
                <i className="fas fa-chevron-right"></i>
              </ScrollButton>
            </CategoryContainer>
          </CategorySection>
        ))}

        <CategorySection>
          <CategoryHeader category="education">
            <FaGraduationCap />
            <h2>Educational Videos</h2>
          </CategoryHeader>
          <VideoGrid>
            {Object.entries(educationalAndSportsVideos.education).map(([id, video]) => (
              <VideoCard key={id} onClick={() => handlePlayVideo({ ...video, id }, 'education')}>
                <VideoThumbnail>
                  <img src={getThumbnailUrl(video.url, 'education')} alt={video.title} />
                  <PlayButton>
                    <FaPlay />
                  </PlayButton>
                </VideoThumbnail>
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoDescription>{video.description}</VideoDescription>
                  <CategoryBadge category="education">
                    <FaGraduationCap />
                    {video.category}
                  </CategoryBadge>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        </CategorySection>

        <CategorySection>
          <CategoryHeader category="sports">
            <FaRunning />
            <h2>Sports Videos</h2>
          </CategoryHeader>
          <VideoGrid>
            {Object.entries(educationalAndSportsVideos.sports).map(([id, video]) => (
              <VideoCard key={id} onClick={() => handlePlayVideo({ ...video, id }, 'sports')}>
                <VideoThumbnail>
                  <img src={getThumbnailUrl(video.url, 'sports')} alt={video.title} />
                  <PlayButton>
                    <FaPlay />
                  </PlayButton>
                </VideoThumbnail>
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoDescription>{video.description}</VideoDescription>
                  <CategoryBadge category="sports">
                    <FaRunning />
                    {video.category}
                  </CategoryBadge>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        </CategorySection>
      </>
    );
  };

  return (
    <HomeContainer>
      <Navbar>
        <Logo>VideoStream</Logo>
        <SearchBar
          type="text"
          placeholder="Search movies, genres, or languages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ActionButtons>
          <NavActionButton onClick={handleLivestreamClick}>
            <i className="fas fa-video"></i> Go Live
          </NavActionButton>
          <NavActionButton primary onClick={handleUploadClick}>
            <i className="fas fa-upload"></i> Upload
          </NavActionButton>
          <UserProfile onClick={() => setShowDropdown(!showDropdown)}>
            <UserAvatar>{getInitials(userEmail)}</UserAvatar>
            <UserName>{userEmail.split('@')[0]}</UserName>
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem onClick={handleProfileClick}>
                  <i className="fas fa-user"></i> Profile
                </DropdownItem>
                <DropdownItem onClick={handleSettingsClick}>
                  <i className="fas fa-cog"></i> Settings
                </DropdownItem>
                <Divider />
                <DropdownItem onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserProfile>
        </ActionButtons>
      </Navbar>

      <Content>
        {renderContent()}
      </Content>

      {showUploadModal && (
        <UploadModal>
          <ModalContent>
            <ModalTitle>Upload Video</ModalTitle>
            <form onSubmit={handleUploadSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Video File</Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="button" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" primary>
                  Upload
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </UploadModal>
      )}
    </HomeContainer>
  );
}

export default Home; 