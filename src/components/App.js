import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, experimental_sx as sx } from "@mui/material/styles";
import { deepOrange, grey, blue } from "@mui/material/colors";
import Nav from "./Nav";
import TinyMCE from "./TinyMCE";
import ViewAritcle from "./ViewArticle";
import TypeSearch from "./Search/TypeSearch";
import Search from "./Search/Search";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Profile/Profile";
import { getUserData } from "./actions/userActions";
import { useDispatch } from "react-redux";
import HomePage from "./Home/HomePage";
import { createContext } from "react";

export const UserContext = createContext();

const ReDiRecT = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [navigate]);
}

const App = () => {
  const [mode, setMode] = useState("dark");
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(userData)
    if (userData) return;
    let localdata = localStorage.getItem("user");
    if (!localdata) return;
    localdata = JSON.parse(localdata);
    dispatch(getUserData(localdata._id)).then((res) => {
      setUserData(res.payload.user);
    })
  }, [userData, dispatch]);

  const ToggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    components: {
      MuiAvatar: {
        styleOverrides: {
          root: sx({
            border: '1px solid #000',
          })
        },
      }
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
          primary: deepOrange,
          divider: grey[700],
          background: {
            default: "#fff",
            paper: "#fff",
          },
          text: {
            main: "#000",
          },
          link: {
            main: '#0568CD',
          }
        }
        : {
          primary: {
            main: "#fff",
          },
          secondary: blue,
          divider: grey[700],
          background: {
            default: grey[900],
            paper: "#000",
          },
          text: {
            main: "#fff",
            primary: "#fff",
            secondary: grey[500],
          },
          link: {
            main: '#0568CD',
          }
        }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={userData} >
        <Nav ToggleTheme={ToggleTheme} />
        <Routes>
          <Route path="/" element={<ReDiRecT />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/write" element={<TinyMCE />} />
          <Route path="/update/:id" element={<TinyMCE update />} />
          <Route path="/article/:id" element={<ViewAritcle />} />
          <Route path="/type/:type" element={<TypeSearch />} />
          <Route path="/search">
            <Route path="/search/:q/:type" element={<Search />} />
            <Route path="/search/:q" element={<Search />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
