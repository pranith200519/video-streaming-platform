import React from 'react';
import styled from 'styled-components';
import channels from '../data/channels';

const ChannelContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ChannelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ChannelTitle = styled.h2`
  color: #333;
  margin: 0;
  font-size: 1.8rem;
`;

const ChannelStats = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ChannelDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const MemberCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MemberAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-weight: bold;
  color: #333;
`;

const MemberRole = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
`;

const MemberJoinDate = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.25rem;
`;

const RoleBadge = styled.span`
  background: ${props => {
    switch(props.role) {
      case 'Admin': return '#e50914';
      case 'Moderator': return '#1e3c72';
      default: return '#666';
    }
  }};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-left: 0.5rem;
`;

function ChannelList() {
  const channel = channels[0]; // Get the first channel

  return (
    <ChannelContainer>
      <ChannelHeader>
        <ChannelTitle>{channel.name}</ChannelTitle>
        <ChannelStats>
          <StatItem>
            <StatValue>{channel.members.length}</StatValue>
            <StatLabel>Members</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{channel.totalVideos}</StatValue>
            <StatLabel>Videos</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{channel.subscribers}</StatValue>
            <StatLabel>Subscribers</StatLabel>
          </StatItem>
        </ChannelStats>
      </ChannelHeader>

      <ChannelDescription>{channel.description}</ChannelDescription>

      <MembersGrid>
        {channel.members.map(member => (
          <MemberCard key={member.id}>
            <MemberAvatar src={member.avatar} alt={member.name} />
            <MemberInfo>
              <MemberName>
                {member.name}
                <RoleBadge role={member.role}>{member.role}</RoleBadge>
              </MemberName>
              <MemberRole>Joined {new Date(member.joinedDate).toLocaleDateString()}</MemberRole>
            </MemberInfo>
          </MemberCard>
        ))}
      </MembersGrid>
    </ChannelContainer>
  );
}

export default ChannelList; 