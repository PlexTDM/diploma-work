import { Paper, Button, Stack, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowSearch = props => {
  const navigate = useNavigate();
  const { data } = props;

  const stripHtml = (html)=>{
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  return (
    <Paper className='mt-2 min-h-[85vh] m-4 flex flex-col items-center' elevation={24}>
      {data && data.length !== 0 ?
        data.map((data, i) => {
          return <Stack key={i} className='!h-min !h-[2%] w-auto min-w-[50%]' spacing={2} direction="column">
            <Button onMouseUp={() => navigate('/article/' + data._id)} variant='text'>{data.title}</Button>
            <Typography component={'div'}
              // className='!mt-0'
            >{stripHtml(data.body).substring(0, 100)}...</Typography>
            <Divider />
          </Stack>
        }) : <div>No Results</div>}
    </Paper>
  )
}

export default ShowSearch;