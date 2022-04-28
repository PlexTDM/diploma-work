import { Paper, Button, Stack, Typography, Divider, Pagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ShowSearch = props => {
  const navigate = useNavigate();
  const { type, pagination } = props;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(props.data);
  const limit = props.limit || 1;
  const theme = useTheme();
  const mode = theme.palette.mode;

  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

  const handlePage = (e, val) => {
    const fetchData = async () => {
      let skip = (val - 1) * limit;
      const { data } = await axios.get(`${api}/search?type=${type}&skip=${skip}&limit=${limit}`);
      setData(data.message)
    };
    fetchData();
    setPage(val);
  }

  const getTimeDif = date => {
    date = new Date(date);
    const now = new Date();
    const diff = now.getTime() - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} минутын өмнө`;
    if (hours > 0) return `${hours} цагийн өмнө`;
    if (minutes > 0) return `${minutes} минутын өмнө`;
    if (seconds > 0) return `${seconds} секундын өмнө`;
  }

  return (
    <Paper className='pt-2 min-h-[calc(100vh_-_68px)] flex flex-col items-center' elevation={24}>
      {data && data.length !== 0 ?
        data.map((data, i) => {
          return <Stack key={i} className={`!h-min w-auto min-w-[50%] max-w-[70%] sm:max-w-full prose prose-lg ${mode === 'light' ? 'prose-zinc' : 'prose-invert'}`} spacing={2} direction="column">
            <Button onMouseUp={() => navigate('/article/' + data._id)} variant='text' className='!text-lg' color='link'>{data.title}</Button>
            <p><AccessTimeIcon fontSize='10px' sx={{mb:.5}}/>{getTimeDif(data.date)}</p>
            <Typography component={'div'} sx={{ p: 2 }}>
              {stripHtml(data.body).substring(0, 150)}...
            </Typography>
            <Divider />
          </Stack>
        }) : <span className='text-2xl'>Таны хайлтнаас үр дүн олдсонгүй</span>}
      {pagination && <Pagination className='mt-4' variant="outlined" count={Math.ceil((pagination / limit) || 1)} shape="rounded" page={page} onChange={handlePage} />}
    </Paper>
  )
}

export default ShowSearch;