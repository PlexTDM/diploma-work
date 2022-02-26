import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange, grey, blue } from '@mui/material/colors';
import { Provider } from 'react-redux';
import store from './store';
import Nav from './Nav';
import WriteArticles from './Articles';
import ViewAritcle from './ViewArticle';
import TypeSearch from './TypeSearch';
import Search from './Search';
import Login from './Auth/Login';
import Register from './Auth/Register';

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
            primary: '#000',
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
    <Provider store={store}>
      <Nav ToggleTheme={ToggleTheme}/>
      <Routes>
        {/* <Route path="/" element={<Articles />} /> */}
        <Route path="/write/" element={<WriteArticles />} />
        <Route path="/article/:id" element={<ViewAritcle />} />
        <Route path="/type/:type" element={<TypeSearch />} />
        <Route path="/search">
          <Route path="/search/:q/:type" element={<Search/>} />
          <Route path="/search/:q" element={<Search/>} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Provider>
    </ThemeProvider>
  )
}

export default App;