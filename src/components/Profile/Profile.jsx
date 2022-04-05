import { Avatar, Paper, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import { CLEAR_USER_DATA } from "../constants/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userData = useSelector((state) => state.userData);
  const { user } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch({ type: CLEAR_USER_DATA });
    navigate("/login");
  };

  useEffect(() => {
    const signOut = () => {
      dispatch({ type: CLEAR_USER_DATA });
      navigate("/login");
    };
    if (!user) return signOut();
  }, [user, dispatch, navigate]);

  return (
    <Paper className="w-full min-h-[calc(100vh-66px)] flex justify-center p-2 md:flex-col">
      <div className="flex items-center flex flex-col">
        <Avatar sx={{ width: 300, height: 300 }} src={user && user.avatar} />
        <Typography variant="h3" className="!mx-auto w-min !mt-4">
          {user && user.username}
        </Typography>
        <Button
          sx={[
            {
              display: "relative",
              backgroundColor: "#ad3737",
              ":hover": { backgroundColor: "red" },
            },
            (theme) => {
              return theme.palette.mode === "dark"
                ? { color: "white" }
                : { color: "black" };
            },
          ]}
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
      <div className="md:ml-2 ml-4 md:p-4 border-2 md:w-[95%]">
        {user && <ProfileMenu user={user} />}
      </div>
    </Paper>
  );
};

export default Profile;
