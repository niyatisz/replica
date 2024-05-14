import './App.css';
import { Card, CardContent, Typography, CardMedia, Grid } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import BasicModal from './Modal'

const App = () => {
  const [userData, setUserData] = useState([]);
  const [value, setValue] = useState('recents');
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [favorites, setFavorites] = useState({}); // State to track favorite status

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openEditModal = (userId) => {
    const user = userData.find(user => user.id === userId);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleDelete = (userId) => {
    const updatedUsers = userData.filter(user => user.id !== userId);
    setUserData(updatedUsers);
  };

  const toggleFavorite = (userId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [userId]: !prevFavorites[userId]
    }));
  };

  const handleSaveModal = (updatedUserData) => {
    const updatedUsers = userData.map(user => {
      if (user.id === updatedUserData.id) {
        return updatedUserData;
      }
      return user;
    });
    setUserData(updatedUsers);
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        {userData.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={3}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                alt={user.username}
                style={{ width: "fit-content", padding: "2%" }}
                image={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              />
              <CardContent style={{ flexGrow: 1, fontSize: "200px" }}>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body1">
                  <MailOutlineIcon style={{ verticalAlign: 'middle', marginRight: '5px', color: 'grey' }} />
                  {user.email}
                </Typography>
                <Typography variant="body1"><PhoneOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '5px', color: 'grey' }} /> {user.phone}</Typography>
                <Typography variant="body1"><LanguageOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '5px', color: 'grey' }} />{user.website}</Typography>
              </CardContent>
              <BottomNavigation value={value} onChange={handleChange} style={{ backgroundColor: " #dcd7d7" }}>
                <BottomNavigationAction
                  value="favorites"
                  icon={favorites[user.id] ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'red'  }} />}
                  onClick={() => toggleFavorite(user.id)}
                
                />
                <BottomNavigationAction
                  value="edit"
                  icon={<BorderColorOutlinedIcon />}
                  onClick={() => openEditModal(user.id)}
                  key={user.id}
                />
                <BottomNavigationAction
                  value="delete"
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(user.id)}
                />
              </BottomNavigation>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedUser &&
        <BasicModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          userData={selectedUser}
          onSave={handleSaveModal}
        />
      }
    </div>
  );
}

export default App;
