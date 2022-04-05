import { CLEAR_USER_ARTICLES, GET_USERS_RESET } from "../constants/constants";
import {
  AppBar,
  Avatar,
  Tab,
  Tabs,
  Box,
  Button,
  IconButton,
  TextField,
  Stack,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import { getUserArticle } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { updateUsers } from "../actions/authActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import AdminControl from "./AdminControl";
import SwitchAndroid from "./SwitchAndroid";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return <div>{value === index && <Box sx={{ p: 2 }}>{children}</Box>}</div>;
};

const FullWidthTabs = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = props.user;
  const swal = withReactContent(Swal);
  const { data } = useSelector((state) => state.userArticles);
  const updateDatas = useSelector((state) => state.updateUsers);
  const { loading: updateLoading, data: updateData } = updateDatas;

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getUserArticle(props.user._id));
    return () => {
      dispatch({ type: CLEAR_USER_ARTICLES });
      dispatch({ type: GET_USERS_RESET });
    };
  }, [dispatch, props]);

  const [value, setValue] = useState(0);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [updatePass, setUpdatePass] = useState(false);
  const [password, setPassword] = useState(""); //user.password
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  const api = "http://localhost:4000";

  const handleChange = (e, val) => {
    setValue(val);
  };

  const updatePassHandler = (event) => {
    setUpdatePass(event.target.checked);
  };
  const toBase64 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = () => {
    let pass;
    if(updatePass){
      if(password !== comfirmPassword){
        swal.fire({
          title: "Password not match",
          icon: "error",
        });
      }
      pass = password;
    }else{
      pass = user.password;
    }
    const formData = {
      username: username,
      email: email,
      number: number,
      password: pass,
      avatar: avatar,
      role: user.role,
    };
    console.log(formData);
    dispatch(updateUsers(user._id, formData));
    updateData &&
      swal.fire({
        title: "updated",
        text: updateData.message,
        icon: "success",
      });
  };

  const handleDelete = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        didOpen: () => swal.getCancelButton().focus(),
      })
      .then(async (result) => {
        if (result.value) {
          swal.fire("Устгагдлаа!", "Таны Нийтлэл Устгагдлаа!", "success");
          const userlocal = JSON.parse(localStorage.getItem("user"));
          const access_token = userlocal.access_token;
          const options = {
            headers: { Authorization: "Bearer " + access_token },
          };
          try {
            await axios.delete(api + "/delete/" + id, options);
            console.log("deleted");
          } catch (error) {
            swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
  };

  return (
    <Box
      sx={{ bgcolor: "background.paper" }}
      className="w-[500px] md:w-auto p-2"
    >
      <AppBar position="relative" className="w-full">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          scrollButtons="auto"
        >
          <Tab label="Profile Info" />
          {props.user && props.user.role === "admin" && (
            <Tab label="Admin Control" />
          )}
          <Tab label="Articles" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {updateLoading && <CircularProgress />}
        <Stack direction="column" className="ml-4" spacing={2}>
          <Stack direction="row" spacing={2} className="flex items-center">
            <Avatar src={avatar} sx={{ width: 128, height: 128 }} />
            <Button
              variant="contained"
              sx={{ height: 50, width: 150 }}
              component="label"
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={toBase64} />
            </Button>
          </Stack>
          <TextField
            sx={{ color: "text.primary" }}
            value={username}
            label="Username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            sx={{ color: "text.primary" }}
            value={email}
            label="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            sx={{ color: "text.primary" }}
            value={number}
            label="Number"
            required
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <SwitchAndroid
                  checked={updatePass}
                  onChange={updatePassHandler}
                  inputProps={{ "aria-label": "controlled" }}
                  color="secondary"
                />
              }
              label="Update Password?"
            />
          </FormGroup>
          {updatePass ? (
            <>
              <TextField
                sx={{ color: "text.primary" }}
                value={password}
                label="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                sx={{ color: "text.primary" }}
                value={comfirmPassword}
                label="Comfirm Password"
                required
                onChange={(e) => {
                  setComfirmPassword(e.target.value);
                }}
              />
            </>
          ) : null}
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Stack>
      </TabPanel>

      {props.user && props.user.role === "admin" && (
        <TabPanel value={value} index={1}>
          <AdminControl user={user} />
        </TabPanel>
      )}

      <TabPanel value={value} index={2}>
        {data && data.length !== 0 ? (
          data.map((item) => (
            <div key={item._id} className="flex flex-row relative m-2">
              <Link className="max-w-[75%]" to={"/article/" + item._id}>
                {item.title}
              </Link>
              <div className="flex flex-row absolute right-0">
                <Link to={"/update/" + item._id}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleDelete(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <div>No Articles</div>
        )}
      </TabPanel>
    </Box>
  );
};

export default FullWidthTabs;
