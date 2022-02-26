import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Paper, Typography, Stack } from '@mui/material';

const One = () => {
  const { id } = useParams();
  const [article, setArticle] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:4000/idsearch/' + id)
      setArticle(data.message[0])
    };
    fetchData();
  }, [id])

  const sharebtnstyles = "w-[20%] flex justify-center bg-[#3e5ba9] p-2 cursor-pointer uppercase"
  const sharebtnstyles1 = "w-[20%] flex justify-center bg-[#1da1f3] p-2 cursor-pointer uppercase"

  const shareUrl = 'http://github.com';
  const quote = article.title || '';
  return (
    <Paper className='relative mb-[5%] p-8'>
      <div className='articleHead'>
        <Typography variant='h2'>
          {article.title}
        </Typography>
        <span className="info">
          <Typography className="author">By: {article.author}</Typography>
          <Typography className="date">{article.date}</Typography>
        </span>
      </div>
      <div className='articleBody w-[80%]'
        dangerouslySetInnerHTML={{ __html: article.body }}
      ></div>
      <span className="info">
        <Typography className="author">By: {article.author}</Typography>
        <Typography className="date">{article.date}</Typography>
      </span>
      <Stack spacing={2} direction='row' className='px-8 py-2'>
        <p
          onClick={()=>{
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`,'newwindow', 'width=600, height=350');
              return false;
            }}
          className={sharebtnstyles}>
          <i className="fa fa-facebook-square" aria-hidden="true">
            <span className='socialsharebtn ml-[7px]'>Хуваалцах</span>
          </i>
        </p>
        
        <p
          onClick={()=>{
            window.open(`https://twitter.com/intent/tweet?text=${quote}%20${window.location.href}`,'newwindow', 'width=600, height=350');
            return false;
          }}
          className={sharebtnstyles1}>
          <i className="fa fa-twitter-square" aria-hidden="true">
            <span className='socialsharebtn ml-[7px]'>Жиргэх</span>
          </i>
        </p>
      </Stack>
    </Paper>
  )
}
export default One;