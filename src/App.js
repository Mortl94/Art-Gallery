import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PhotoGallery from './PhotoGallery';
import ArtistInfo from './ArtistInfo'; 
import './App.css';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <div>
        <AppBar position="sticky" style={{ backgroundColor: '#eceff1', color: '#333', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Sebastian Gessenharter
            </Typography>
            <Button color="inherit" component={Link} to="/" style={{ color: '#333' }}>
              Galerie
            </Button>
            <Button color="inherit" component={Link} to="/artist" style={{ color: '#333' }}>
              Zur Person
            </Button>
{/*             <Button color="inherit" component={Link} to="/admin" style={{ color: '#333' }}>
              Admin
            </Button> */}
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<PhotoGallery />} />
          <Route path="/artist" element={<ArtistInfo />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
