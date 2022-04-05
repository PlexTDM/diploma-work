import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const [mode, setMode] = useState("dark");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const { user } = userData;

  useEffect(() => {
    if (user) return;
    if (!localStorage.getItem("user")) return;
    const localData = JSON.parse(localStorage.getItem("user"));
    dispatch(getUserData(localData._id));
  }, [user, dispatch]);

  const ToggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    // components: {
    //   MuiTextField:{
    //     primary: blue
    //   }
    // },
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
              primary: "#000",
              secondary: grey[500],
            },
            // divider: grey[700],
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
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Nav ToggleTheme={ToggleTheme} />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/" element={<Articles />} /> */}
        <Route path="/write/" element={<TinyMCE />} />
        <Route path="/update/:id" element={<TinyMCE update />} />
        <Route path="/article/:id" element={<ViewAritcle />} />
        <Route path="/type/:type" element={<TypeSearch />} />
        <Route path="/search">
          <Route path="/search/:q/:type" element={<Search />} />
          <Route path="/search/:q" element={<Search />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
