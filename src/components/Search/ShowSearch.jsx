import { Paper, Button, Stack, Typography, Divider, Pagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ShowSearch = props => {
  const navigate = useNavigate();
  const { type, pagination } = props;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(props.data);
  const limit = props.limit
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

  return (
    <Paper className='pt-2 min-h-[calc(100vh_-_68px)] flex flex-col items-center' elevation={24}>
      {data && data.length !== 0 ?
        data.map((data, i) => {
          return <Stack key={i} className={`!h-min w-auto min-w-[50%] max-w-[70%] prose prose-lg ${mode === 'light' ? 'prose-zinc' : 'prose-invert'}`} spacing={2} direction="column">
            <Button onMouseUp={() => navigate('/article/' + data._id)} variant='text' color='link'>{data.title}</Button>
            <Typography component={'div'} sx={{p:2}}>
              {stripHtml(data.body).substring(0, 150)}...
            </Typography>
            <Divider />
          </Stack>
        }) : <span className='text-2xl'>Таны хайлтнаас үр дүн олдсонгүй</span>}
      {pagination && <Pagination className='mt-4' variant="outlined" count={Math.ceil(pagination / limit)} shape="rounded" page={page} onChange={handlePage} />}
    </Paper>
  )
}

export default ShowSearch;