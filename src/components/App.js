import { useState } from 'react';
import Nav from './Nav';
import WriteArticles from './Articles';
import ViewAritcle from './ViewArticle';
import Search from './Search';
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange, grey, blue } from '@mui/material/colors';
import './App.css';

const App = () => {

  const [mode, setMode] = useState('dark');

  const ToggleTheme = ()=>{
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  const theme = createTheme({
    // components: {
    //   MuiTextField:{
    //     primary: blue
    //   }
    // },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: deepOrange,
          divider: grey[700],
          background: {
            default: '#fff',
            paper: '#fff',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }
        : {
          primary: {
            main: '#fff',
          },
          secondary:blue,
          divider: grey[700],
          background: {
            default: grey[900],
            paper: '#000',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
    },
  });

  return (

    <ThemeProvider theme={theme}>
      <Nav ToggleTheme={ToggleTheme}/>
      <Routes>
        {/* <Route path="/" element={<Articles />} /> */}
        <Route path="/write/" element={<WriteArticles />} />
        <Route path="/article/:id" element={<ViewAritcle />} />
        <Route path="/search/:type" element={<Search />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;