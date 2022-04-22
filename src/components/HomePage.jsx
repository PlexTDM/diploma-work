import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Stack, Divider } from "@mui/material";
import { getHomeArticles } from "./actions/userActions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import LoadingCircle from './LoadingCircle';
import noImage from '../assets/no-image.png';
import axios from 'axios';

const HomePage = () => {
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
  }, [dispatch]);
  // useEffect(() => {
  //   data && data.sort((a, b) => a._id - b._id);
  // }, [data]);
  // useEffect(() => {
  //   const types = ['politics', 'sport', 'health', 'technology'];
  //   if (typeArr.length > 0) return
  //   types.forEach(async type => {
  //     const { data } = await axios.get(`http://localhost:4000/search?type=${type}&limit=5&project=title,poster`);
  //     SettypeArr(prevState => [...prevState, { type, data: data.message }])
  //   })
  // }, []);

  useEffect(() => {
    if (typeArr.length > 0) return
    const sendReq = (type, i) => {
      const url = `http://localhost:4000`;
      axios.get(`${url}/search?type=${type}&limit=1&skip=${i}&project=title,poster,body`).then((response) => {
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
    // putting same type in different same array
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
    })
    // console.log(newArr)
    return newArr;
  }

  const sortedTypes = sortByType();

  return (
    <Paper sx={{ maxWidth: '100%', minHeight: 'calc(100vh - 68px)' }} className='flex justify-center'>
      {loading && <LoadingCircle />}
      <Stack direction='column' className='flex w-full items-center cursor-pointer'>
        {data && data[0] &&
          <div className="w-1/3 m-4">
            <Carousel
              autoPlay interval={5000} infiniteLoop showThumbs={false} showStatus={false}>
              {data.map((item, i) => (
                <div key={i} onClick={() => navigate('/article/' + item._id)}>
                  <img src={item.poster && typeof item.poster === "string" ? item.poster : noImage} alt={item.title} />
                  <p className="legend">{item.title}</p>
                </div>
              ))}
            </Carousel>
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
                      <span className="">{data.title}</span>
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
