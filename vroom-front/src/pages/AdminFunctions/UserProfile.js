import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetailsById } from '../../services/api'; 
function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const { uid } = useParams();
  
  console.log("Route parameter uid:", uid); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!uid) {
        console.error("UID parameter is missing");
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching user details with UID:", uid);
        const response = await getUserDetailsById(uid);
        console.log("User details response:", response.data);
        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(`Failed to fetch user details: ${err.message}`);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userDetails) return <div>No user details found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '600px',
        backgroundColor: '#f9f9f9',
      }}>
        <p><strong>User ID:</strong> {userDetails.uid}</p>
        {userDetails.fullName && <p><strong>Name:</strong> {userDetails.fullName}</p>}
        {userDetails.driverLicenseNumber && <p><strong>Driver LicenseNumber:</strong> {userDetails.driverLicenseNumber}</p>}
        {userDetails.contact && <p><strong>Phone:</strong> {userDetails.contact}</p>}
        {userDetails.address && <p><strong>Address:</strong> {userDetails.address}</p>}
        
      </div>
    </div>
  );
}

export default UserProfile;