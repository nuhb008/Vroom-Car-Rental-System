import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function SeeAllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '90vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '600px',
      marginBottom: '20px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#333333',
      borderBottom: '1px solid #eee',
      paddingBottom: '15px',
    },
    userCard: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      width: '100%',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    detailItem: {
      display: 'flex',
      borderBottom: '1px solid #f0f0f0',
      padding: '8px 0',
    },
    label: {
      fontWeight: 'bold',
      width: '40%',
      color: '#555',
    },
    value: {
      width: '60%',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '15px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#ffffff',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>All Users</h2>
        
        {users.length === 0 ? (
          <p>Loading users...</p>
        ) : (
          users.map((user) => (
            <div key={user.UID || user.uid} style={styles.userCard}>
              <div style={styles.detailItem}>
                <span style={styles.label}>Username:</span>
                <span style={styles.value}>{user.username}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.label}>User Type:</span>
                <span style={styles.value}>{user.userType}</span>
              </div>
              <div style={styles.buttonGroup}>
                <button 
                  style={styles.button}
                  onClick={() => navigate(`/user/${user.uid || user.UID}`)}
                >
                  See Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SeeAllUsers;