import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from "react-router-dom";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(()=> {
      if(value === 0) navigate('/');
      else if(value === 1) navigate("/movies");
      else if(value === 2) navigate("/series");
      else if(value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <Box sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "tomato",
        zIndex: 100,
    
        
      } }>
      <BottomNavigation
        style={{backgroundColor: "#2d313a"} }
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color: "whitesmoke"}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color: "whitesmoke"}} label="Movies" icon={<LocalMoviesIcon />} />
        <BottomNavigationAction style={{color: "whitesmoke"}} label="Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color: "whitesmoke"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
