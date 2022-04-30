import { GET_USERS_RESET, UPDATE_USERS_RESET } from "../constants/constants";
import { AppBar, Avatar, Tab, Tabs, Box, Button, IconButton, TextField, Stack, CircularProgress, FormControlLabel, FormGroup, Divider, Pagination } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import { getUserArticles } from "../features/getUserArticles";
import { getUserData } from '../features/getUserData';
import { useSelector, useDispatch } from "react-redux";
import { updateUsers } from "../actions/authActions";
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect, Fragment } from "react";
import AdminControl from "./AdminControl";
import SwitchAndroid from "./SwitchAndroid";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const TabPanel = (props) => {
  const { children, value, index, className } = props;

  return <div>{value === index && <Box sx={{ p: 2 }} className={className}>{children}</Box>}</div>;
};

const FullWidthTabs = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = props.user;
  const swal = withReactContent(Swal);
  const { articles: userArticles, count: articlesCount } = useSelector(state => state.userArticles);
  const { loading: updateLoading, data: updateData } = useSelector(state => state.updateUsers);

  const [value, setValue] = useState(0);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [updatePass, setUpdatePass] = useState(false);
  const [password, setPassword] = useState(""); //user.password
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  const [page, setPage] = useState(1);
  const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

  useEffect(() => {
    if (!user) return navigate("/login");
    dispatch(getUserArticles({userId:props.user._id, skips:page - 1}));
  }, [user, navigate, dispatch, props, page]);
  useEffect(() => {
    const swal = withReactContent(Swal);
    updateData && swal.fire({
      title: "Updated",
      text: updateData.message,
      icon: "success",
    }) && dispatch(getUserData(user._id)) && dispatch({ type: UPDATE_USERS_RESET });
  }, [updateData, dispatch, user._id]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'userArticles/clear' });
      dispatch({ type: GET_USERS_RESET });
    };
  }, [dispatch, props]);

  const handleChange = (e, val) => {
    setValue(val);
  };

  const updatePassHandler = (event) => {
    setUpdatePass(event.target.checked);
  };
  const resizeImage = (file, maxSize) => {
    let reader = new FileReader();
    let image = new Image();
    let canvas = document.createElement('canvas');
    const resize = () => {
      let width = image.width;
      let height = image.height;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);
      return canvas.toDataURL('image/png');
    };
    return new Promise(resolve => {
      reader.onload = e => {
        image.onload = () => resolve(resize());
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };
  const toBase64 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      resizeImage(e.target.files[0], 500).then(res => {
        setAvatar(res);
      })
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const refreshUsers = () => dispatch(getUserArticles(props.user._id))

  const handleUpdate = () => {
    let pass;
    if (updatePass && password.trim() !== '') {
      if (password !== comfirmPassword) {
        swal.fire({
          title: "Password not match",
          icon: "error",
        });
      }
      pass = password;
    } else {
      pass = user.password;
    }
    if (username.trim() === '' || email.trim() === '' || number.trim() === '') return swal.fire('Бүх талбаруудыг бөглөнө үү!')
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
  };

  const handleDelete = id => {
    swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      didOpen: () => swal.getCancelButton().focus(),
    }).then(async result => {
      if (result.value) {
        swal.fire("Устгагдлаа!", "Таны Нийтлэл Устгагдлаа!", "success");
        const options = {
          headers: { Authorization: "Bearer " + user.access_token },
        };
        try {
          await axios.delete(api + "/delete/" + id, options).then(console.log("deleted"))
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
      className={`w-[500px] md:w-auto p-2`}>
      <AppBar position="relative" className="w-full">
        <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth" scrollButtons="auto">
          <Tab label="Profile Info" />
          {props.user && props.user.role === "admin" && (
            <Tab label="Admin Control" />
          )}
          {props.user && (props.user.role === 'admin' || props.user.role === 'writer') &&
            <Tab label="Articles" />
          }
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {updateLoading && <CircularProgress />}
        <Stack direction="column" className="ml-4" spacing={2}>
          <Stack direction="row" spacing={2} className="flex items-center">
            <Avatar src={avatar} sx={{ width: 128, height: 128 }} variant='square' />
            <Button variant="contained" sx={{ height: 50, width: 150 }} component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={toBase64} />
            </Button>
          </Stack>
          <TextField sx={{ color: "text.primary" }} value={username} label="Username" required onChange={e => setUsername(e.target.value)} />
          <TextField sx={{ color: "text.primary" }} value={email} label="Email" required onChange={e => setEmail(e.target.value)} />
          <TextField sx={{ color: "text.primary" }} value={number} label="Number" required onChange={e => setNumber(e.target.value)} />
          <FormGroup>
            <FormControlLabel
              control={
                <SwitchAndroid checked={updatePass} onChange={updatePassHandler} inputProps={{ "aria-label": "controlled" }} color="secondary" />
              }
              label="Update Password?" />
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
        <TabPanel className='relative min-h-[500px]' value={value} index={1}>
          <AdminControl user={user} />
        </TabPanel>
      )}

      {/* TODO: add pagination here */}
      {props.user && (props.user.role === 'admin' || props.user.role === 'writer') && <TabPanel className='min-h-[500px] relative' value={value} index={2}>
        <div className="relative">
          <IconButton className='!absolute top-[-20px] right-[-15px]' onClick={refreshUsers}><ReplayIcon /></IconButton>
          {userArticles && userArticles.length !== 0 ? (
            userArticles.map(item => (
              <Fragment key={item._id}>
                <div className="flex flex-row relative m-2">
                  <Link className="max-w-[75%]" to={"/article/" + item._id}>
                    {item.title}
                  </Link>
                  <div className="flex flex-row absolute right-0">
                    <Link to={"/update/" + item._id} className='group'>
                      <IconButton>
                        <EditIcon className="group-hover:fill-green-500" />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDelete(item._id)} className='group'>
                      <DeleteIcon className='group-hover:fill-red-500' />
                    </IconButton>
                  </div>
                </div>
                <Divider />
              </Fragment>
            ))
          ) : (
            <div>No Articles</div>
          )}
        </div>
        {articlesCount && <Pagination className="mt-4 absolute bottom-0 right-0 left-0 mx-auto w-max" count={Math.ceil(articlesCount / 5)} page={page} onChange={(e, page) => setPage(page)} shape='rounded' variant="outlined" />}
      </TabPanel>}
    </Box>
  );
};

export default FullWidthTabs;
