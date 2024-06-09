import React, { useState ,useEffect} from 'react';
import './App.css';
import Routers from './Router/Router.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';

function App() {
  const [searchdata, setsearchdata] = useState('');
  const [preferDarkMode, setMode] = useState('light');
   
  const switchMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  

  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferDarkMode,
        },
      }),
    [preferDarkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <CssBaseline />
          <Header setsearchdata={setsearchdata} switchMode={switchMode} />
          <Routers searchdata={searchdata} />
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
