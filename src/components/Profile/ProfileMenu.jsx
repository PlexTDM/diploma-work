import { CLEAR_USER_ARTICLES, GET_USERS_RESET } from '../constants/constants';
import { AppBar, Tab, Tabs, Box, IconButton } from '@mui/material';
import withReactContent from 'sweetalert2-react-content';
import { getUserArticle } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import AdminControl from './AdminControl';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 2 }}>{children}</Box>
      )}
    </div>
  );
}

const FullWidthTabs = props => {
  const swal = withReactContent(Swal);
  const { data } = useSelector(state => state.userArticles);

  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const api = 'http://localhost:4000';

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_USER_ARTICLES });
      dispatch({ type: GET_USERS_RESET });
    }
  }, [dispatch])


  const handleChange = (e, val) => {
    setValue(val);
  };

  const handleDelete = id => {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      didOpen: () => swal.getCancelButton().focus()
    }).then(async result => {
      if (result.value) {
        swal.fire(
          'Устгагдлаа!',
          'Таны Нийтлэл Устгагдлаа!',
          'success'
        );
        const userlocal = JSON.parse(localStorage.getItem('user'));
        const access_token = userlocal.access_token;
        const options = { headers: { 'Authorization': 'Bearer ' + access_token } };
        try {
          await axios.delete(api + '/delete/' + id, options)
          console.log('deleted')
        } catch (error) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }

      }
    })
  }

  return (
    <Box sx={{ bgcolor: 'background.paper' }} className='w-[500px] md:w-auto p-2'>
      <AppBar position="relative" className='w-full'>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          // variant="scrollable"
          scrollButtons="auto">
          <Tab label="Articles" />
          {props.user && props.user.role === 'admin' &&
            <Tab label="Admin Control" />
          }
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {data && data.length !== 0 ? data.map(item => <div key={item._id} className='flex flex-row relative m-2'>
          <Link className='max-w-[75%]' to={'/article/' + item._id}>{item.title}</Link>
          <div className='flex flex-row absolute right-0'>
            <Link to={'/update/' + item._id}><IconButton><EditIcon /></IconButton></Link>
            <IconButton onClick={() => handleDelete(item._id)}><DeleteIcon /></IconButton>
          </div>
        </div>) : props.user && dispatch(getUserArticle(props.user._id)) && 'Loading'}
      </TabPanel>
      {props.user && props.user.role === 'admin' &&
        <TabPanel value={value} index={1}>
          <AdminControl />
        </TabPanel>
      }


      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

export default FullWidthTabs;