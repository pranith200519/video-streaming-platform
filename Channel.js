import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaUpload, FaVideo, FaInfoCircle, FaPlay, FaThumbsUp, FaThumbsDown, FaShare, FaComment, FaUser, FaEdit, FaCog, FaBell, FaBellSlash } from 'react-icons/fa';
import './Channel.css';

const Channel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('videos');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [channelData, setChannelData] = useState({
    name: "Channel Name",
    description: "Welcome to my channel! I create content about...",
    avatar: "https://via.placeholder.com/150",
    banner: "https://via.placeholder.com/1200x300",
    subscribers: 1200000,
    totalViews: 25000000,
    joinDate: "2020-01-01",
    isVerified: true,
    customUrl: "@channelname"
  });
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "My First Video",
      thumbnail: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg",
      views: "1.2K",
      likes: 150,
      dislikes: 5,
      comments: [
        {
          id: 1,
          user: "John Doe",
          text: "Great video!",
          timestamp: "2 days ago",
          likes: 5
        },
        {
          id: 2,
          user: "Jane Smith",
          text: "Thanks for sharing!",
          timestamp: "1 day ago",
          likes: 3
        }
      ],
      uploadDate: "2 days ago",
      isLiked: false,
      isDisliked: false,
      duration: "10:30",
      description: "This is my first video on the channel..."
    },
    {
      id: 2,
      title: "Channel Introduction",
      thumbnail: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
      views: "3.5K",
      likes: 320,
      dislikes: 12,
      comments: [
        {
          id: 1,
          user: "Mike Johnson",
          text: "Nice introduction!",
          timestamp: "1 week ago",
          likes: 8
        }
      ],
      uploadDate: "1 week ago",
      isLiked: false,
      isDisliked: false,
      duration: "15:45",
      description: "Welcome to my channel! In this video..."
    }
  ]);

  const [editData, setEditData] = useState({
    name: channelData.name,
    description: channelData.description,
    customUrl: channelData.customUrl
  });

  useEffect(() => {
    // Here you would typically fetch channel data based on the id
    // For now, we'll use the mock data
  }, [id]);

  const handleLike = (videoId) => {
    setVideos(videos.map(video => {
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

  const handleDislike = (videoId) => {
    setVideos(videos.map(video => {
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

  const handleComment = (videoId) => {
    setShowComments(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleCommentSubmit = (videoId) => {
    if (commentText[videoId]?.trim()) {
      setVideos(videos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            comments: [
              ...video.comments,
              {
                id: Date.now(),
                user: "Current User",
                text: commentText[videoId],
                timestamp: "Just now",
                likes: 0
              }
            ]
          };
        }
        return video;
      }));
      setCommentText(prev => ({
        ...prev,
        [videoId]: ""
      }));
    }
  };

  const handleCommentLike = (videoId, commentId) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        return {
          ...video,
          comments: video.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.likes + 1
              };
            }
            return comment;
          })
        };
      }
      return video;
    }));
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    setChannelData(prev => ({
      ...prev,
      subscribers: isSubscribed ? prev.subscribers - 1 : prev.subscribers + 1
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setChannelData(prev => ({
      ...prev,
      ...editData
    }));
    setShowEditModal(false);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="channel-container">
      <div className="channel-banner">
        <img src={channelData.banner} alt="Channel Banner" />
        {isSubscribed && <div className="notification-bell">
          <FaBell />
        </div>}
      </div>

      <div className="channel-header">
        <div className="channel-avatar">
          <img src={channelData.avatar} alt="Channel Avatar" />
          {channelData.isVerified && <span className="verified-badge">✓</span>}
        </div>
        <div className="channel-info">
          <h1 className="channel-name">{channelData.name}</h1>
          <div className="channel-custom-url">{channelData.customUrl}</div>
          <div className="channel-stats">
            <span>{formatNumber(channelData.subscribers)} subscribers</span>
            <span>{formatNumber(channelData.totalViews)} views</span>
            <span>Joined {new Date(channelData.joinDate).toLocaleDateString()}</span>
          </div>
          <p className="channel-description">{channelData.description}</p>
        </div>
        <div className="action-buttons">
          <button 
            className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
            onClick={handleSubscribe}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
          <button 
            className="notification-button"
            onClick={() => setIsSubscribed(!isSubscribed)}
          >
            {isSubscribed ? <FaBell /> : <FaBellSlash />}
          </button>
          <button 
            className="edit-button"
            onClick={() => setShowEditModal(true)}
          >
            <FaEdit /> Customize Channel
          </button>
          <button 
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            <FaUpload /> Upload Video
          </button>
          <button 
            className="live-button"
            onClick={() => setShowLiveModal(true)}
          >
            <FaVideo /> Start Live
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <FaVideo /> Videos
        </button>
        <button 
          className={`tab ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          <FaPlay /> Live
        </button>
        <button 
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <FaInfoCircle /> About
        </button>
      </div>

      <div className="videos-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <div className="video-stats">
                <span>{video.views} views</span>
                <span>{video.uploadDate}</span>
              </div>
              <p className="video-description">{video.description}</p>
              <div className="video-actions">
                <button 
                  className={`action-button ${video.isLiked ? 'liked' : ''}`}
                  onClick={() => handleLike(video.id)}
                >
                  <FaThumbsUp /> {video.likes}
                </button>
                <button 
                  className={`action-button ${video.isDisliked ? 'disliked' : ''}`}
                  onClick={() => handleDislike(video.id)}
                >
                  <FaThumbsDown /> {video.dislikes}
                </button>
                <button 
                  className="action-button"
                  onClick={() => handleComment(video.id)}
                >
                  <FaComment /> {video.comments.length}
                </button>
                <button className="action-button">
                  <FaShare /> Share
                </button>
              </div>
              
              {showComments[video.id] && (
                <div className="comments-section">
                  <div className="comment-input">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText[video.id] || ""}
                      onChange={(e) => setCommentText(prev => ({
                        ...prev,
                        [video.id]: e.target.value
                      }))}
                    />
                    <button onClick={() => handleCommentSubmit(video.id)}>Post</button>
                  </div>
                  <div className="comments-list">
                    {video.comments.map(comment => (
                      <div key={comment.id} className="comment">
                        <div className="comment-header">
                          <FaUser className="comment-avatar" />
                          <span className="comment-user">{comment.user}</span>
                          <span className="comment-timestamp">{comment.timestamp}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <button 
                          className="comment-like"
                          onClick={() => handleCommentLike(video.id, comment.id)}
                        >
                          <FaThumbsUp /> {comment.likes}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Upload Video</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowUploadModal(false);
            }}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea required></textarea>
              </div>
              <div className="form-group">
                <label>Video File</label>
                <input type="file" accept="video/*" required />
              </div>
              <div className="form-group">
                <label>Thumbnail</label>
                <input type="file" accept="image/*" required />
              </div>
              <div className="form-group">
                <label>Visibility</label>
                <select required>
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit">Upload</button>
                <button type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLiveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Start Live Stream</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowLiveModal(false);
            }}>
              <div className="form-group">
                <label>Stream Title</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea required></textarea>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select required>
                  <option value="">Select Category</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                  <option value="talk">Talk Show</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Visibility</label>
                <select required>
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit">Start Stream</button>
                <button type="button" onClick={() => setShowLiveModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Customize Channel</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Channel Name</label>
                <input 
                  type="text" 
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Custom URL</label>
                <input 
                  type="text" 
                  value={editData.customUrl}
                  onChange={(e) => setEditData(prev => ({ ...prev, customUrl: e.target.value }))}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Channel Banner</label>
                <input type="file" accept="image/*" />
              </div>
              <div className="form-group">
                <label>Channel Avatar</label>
                <input type="file" accept="image/*" />
              </div>
              <div className="modal-buttons">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Channel; 