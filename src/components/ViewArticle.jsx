import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Paper, Typography, Stack, Avatar } from '@mui/material';

const One = () => {
  const { id } = useParams();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [article, setArticle] = useState('');
  const [author, setAuthor] = useState('');

  // const api = 'http://localhost:4000';
  const api = '';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api+'/idsearch/' + id)
      setArticle(data.article)
      setAuthor(data.author)
    };
    fetchData();
    return () => {
      setArticle('')
      setAuthor('')
    }
  }, [id]);

  const sharebtnstyles = "w-min flex justify-center bg-[#3e5ba9] p-2 cursor-pointer uppercase"
  const sharebtnstyles1 = "w-min flex justify-center bg-[#1da1f3] p-2 cursor-pointer uppercase"
  const avCss = "100px";

  const quote = article.title || '';
  const uri = '/shareurl/6262b3e70954c9453b1c0b86'
  console.log(isSm);
  return (
    <Paper className={`relative mb-[5%] ${isSm?'p-0':'p-12'}`}>
      <article>
        <div className='articleHead'>
          <Typography variant='h2'>
            {article.title}
          </Typography>
          {author && <span className="flex flex-row w-max h-min p-4">
            <Avatar src={author.avatar} alt={author.username} sx={{ width: avCss, height: avCss }} />
            <span className='ml-4 flex flex-col justify-center'>
              <Typography className="author">{author && 'By: ' + author.username}</Typography>
              <Typography className="date">{article && 'Date: ' + article.date}</Typography>
            </span>
          </span>}
        </div>
        <div className={`articleBody ${isSm?'w-[95%]':'w-[80%]'} prose prose-lg ${mode === 'light' ? 'prose-zinc' : 'prose-invert'}`}
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></div>
        {/* <span className="info">
        <Typography className="author">{author && 'By: '+author.username}</Typography>
        <Typography className="date">{article.date}</Typography>
      </span> */}
        <Stack spacing={2} direction='row' className='px-8 py-2'>
          {console.log(window.location.href)}
          <p
            onClick={() => {
              window.open(`https://www.facebook.com/dialog/share?href=${uri}&quote=${quote}&app_id=8203424993064267`, 'newwindow', 'width=600, height=350');
              return false;
            }}
            className={sharebtnstyles}>
            <i className="fa fa-facebook-square" aria-hidden="true">
              <span className='socialsharebtn ml-[7px]'>Хуваалцах</span>
            </i>
          </p>

          <p
            onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=${quote}%20${uri}`, 'newwindow', 'width=600, height=350');
              return false;
            }}
            className={sharebtnstyles1}>
            <i className="fa fa-twitter-square" aria-hidden="true">
              <span className='socialsharebtn ml-[7px]'>Жиргэх</span>
            </i>
          </p>
        </Stack>
      </article>
    </Paper>
  )
}
export default One;