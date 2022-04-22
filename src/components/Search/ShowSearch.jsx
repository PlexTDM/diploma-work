import { Paper, Button, Stack, Typography, Divider, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ShowSearch = props => {
  const navigate = useNavigate();
  const { type, pagination } = props;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(props.data);
  const perPage = 2;


  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const handlePage = (e, val) => {
    const fetchData = async () => {
      let skip = (val - 1) * perPage;
      const { data } = await axios.get(`http://localhost:4000/search?type=${type}&skip=${skip}&limit=2`);
      setData(data.message)
    };
    fetchData();
    setPage(val);
  }

  return (
    <Paper className='mt-2 min-h-[85vh] sm:m-0 m-4 flex flex-col items-center' elevation={24}>

      {data && data.length !== 0 ?
        data.map((data, i) => {
          return <Stack key={i} className='!h-min !h-[2%] w-auto min-w-[50%]' spacing={2} direction="column">
            <Button onMouseUp={() => navigate('/article/' + data._id)} variant='text'>{data.title}</Button>
            <Typography component={'div'} sx={{p:2}}>
              {stripHtml(data.body).substring(0, 100)}...
            </Typography>
            <Divider />
          </Stack>
        }) : <div>No Results</div>}

      {pagination && pagination >= 1 && <Pagination className='mt-4' variant="outlined" count={Math.ceil(pagination / perPage)} shape="rounded" page={page} onChange={handlePage} />}
    </Paper>
  )
}

export default ShowSearch;