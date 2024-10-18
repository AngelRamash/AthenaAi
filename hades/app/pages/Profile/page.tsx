// Profile.tsx
import React from 'react';

interface ProfileProps {
  user: { name: string; role: string };
}

const Profile: React.FC<ProfileProps> = ({ user }) => (
  <div>
    <h1>{user.name}'s Profile</h1>
    <p>Role: {user.role}</p>
  </div>
);

export default Profile;
