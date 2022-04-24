import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Stack, Divider } from "@mui/material";
import { getHomeArticles } from "./actions/userActions";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css';
import LoadingCircle from './LoadingCircle';
import noImage from '../assets/no-image.png';
import axios from 'axios';
import { CLEAR_HOME_SLIDE } from './constants/constants';

const HomePage = () => {
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [typeArr, SettypeArr] = useState([]);
  const homePageData = useSelector(state => state.homePage);
  const { data, loading } = homePageData;
  useEffect(() => {
    // if (data.length >= 4) return
    // get latest 3 seperately so it's faster
    dispatch(getHomeArticles(0));
    dispatch(getHomeArticles(1));
    dispatch(getHomeArticles(2));
    dispatch(getHomeArticles(3));

    return () => {
      dispatch({ type: CLEAR_HOME_SLIDE });
    }

  }, [dispatch]);

  useEffect(() => {
    if (typeArr.length > 0) return
    const sendReq = (type, i) => {
      const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
      axios.get(`${api}/search?type=${type}&limit=1&skip=${i}&project=title,poster,body`).then((response) => {
        const data = response.data.message;
        SettypeArr(prevState => [...prevState, { type, data: data }])
      })
    }
    const types = ['politics', 'sport', 'health', 'tech'];
    types.forEach(type => {
      for (let i = 0; i < 5; i++) {
        sendReq(type, i);
      }
    })
  }, [typeArr]);

  const sortByType = () => {
    const types = ['politics', 'sport', 'health', 'tech'];
    // putting same type in same array
    let newArr = [];
    typeArr.sort((a, b) => a._id - b._id);
    types.map((type) => {
      let arr = [];
      typeArr.map((el, i) => {
        if (el.type === type) {
          if (el.data.length > 0) arr.push({ type: el.type, data: el.data[0] });
        }
        return null;
      })
      if (arr.length > 0) newArr.push(arr);
      return newArr;
    })
    return newArr;
  }

  const sortedTypes = sortByType();

  return (
    <Paper sx={{ maxWidth: '100%', minHeight: 'calc(100vh - 68px)' }} className='flex justify-center'>
      {loading && <LoadingCircle />}
      <Stack direction='column' className='flex w-full items-center cursor-pointer'>
        {data && data[0] &&
          <div className="w-[500px] m-4">
            <Swiper autoplay loop navigation pagination={{ clickable: true }} className='flex items-center'>
              {data.map((item, i) => (
                <SwiperSlide key={i} onClick={() => navigate('/article/' + item._id)} className='p-4'>
                  <img src={item.poster && typeof item.poster === "string" ? item.poster : noImage} alt={item.title} />
                  <p className="legend">{item.title.length > 90 ? item.title.substring(0, 90) + '...': item.title}</p>
                </SwiperSlide>
              ))}
            </Swiper >
          </div>

        }

        {/* <div className="ml-8"> */}
        <Divider />
        {sortedTypes && sortedTypes.map((type, i) => (
          <Fragment key={i}>
            <Grid container spacing={2} className='p-2 !mt-2 min-h-[8rem] h-auto max-w-[100%]'>
              {type.map(data => {
                data = data.data
                return (
                  <div key={data._id} xs={4} className='flex flex-col h-62 w-[25%] overflow-hidden'>
                    <div className="w-full min-h-[100%] relative p-1 ">
                      {typeof data.poster === 'string' && <img src={data.poster} alt={data.title} className='w-full h-auto hp-img' />}
                      <span>{data.title.substring(0, 100) + '...'}</span>
                    </div>
                  </div>)
              })}
            </Grid>
            <Divider />
          </Fragment>
        ))}
      </Stack>
    </Paper>
  )
}

export default HomePage;
