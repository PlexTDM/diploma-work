import { Avatar, Paper, Typography, Button } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { useDispatch } from "react-redux";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Profile = () => {
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch({ type: 'userData/clear' });
    localStorage.removeItem('user');
    navigate("/login");
  };

  useEffect(() => {
    const signOut = () => {
      dispatch({ type: 'userData/clear' });
      localStorage.removeItem('user');
      navigate("/login");
    };
    if (!localStorage.getItem('user')) return signOut();
  }, [dispatch, navigate]);

  return (
    <Paper className="w-full min-h-[calc(100vh-66px)] flex justify-center p-2 md:flex-col">
      <div className="flex items-center flex-col">
        <Avatar sx={{ width: 300, height: 300 }} src={user && user.avatar} />
        <Typography variant="h3" className="!mx-auto w-min !mt-4">
          {user && user.username}
        </Typography>
        {user && (user.role === "admin" || user.role === 'writer') && (
          <Button
            sx={[{ display: "relative", backgroundColor: "#407a59", ":hover": { backgroundColor: "aqua", color: '#c32bf5', fontWeight: 'bold' } },
            (theme) => theme.palette.mode === "dark" ? { color: "white" } : { color: "black" }]}
            onClick={() => navigate('/write')}>
            Write Articles
          </Button>
        )}
        <Button
          sx={[{ display: "relative", backgroundColor: "#ad3737", marginTop: '10px', ":hover": { backgroundColor: "red" } },
          (theme) => theme.palette.mode === "dark" ? { color: "white" } : { color: "black" }]}
          onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <Paper className="md:ml-2 ml-4 md:p-4 md:w-[95%] min-h-[100%] h-min" sx={{ border: 2, borderColor: 'secondary' }}>
        {user && <ProfileMenu user={user} />}
      </Paper>
    </Paper>
  );
};

export default Profile;
