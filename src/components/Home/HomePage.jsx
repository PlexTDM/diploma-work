import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Stack, Divider } from "@mui/material";
import axios from 'axios';
import Weather from "./Weather";
import Slide from "./Slide";

const HomePage = () => {
  const navigate = useNavigate();
  const [typeArr, SettypeArr] = useState([]);

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
      for (let i = 0; i < 4; i++) {
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
    // sort new array by _id, newest first
    newArr.map((arr) => {
      return arr.sort((a, b) => b.data._id.toString().localeCompare(a.data._id.toString()));
    })
    return newArr;
  }

  const sortedTypes = sortByType();
  const mnTypes = ['Улс Төр', 'Спорт', 'Эрүүл Мэнд', 'Технологи'];

  return (
    <Paper sx={{ maxWidth: '100%', minHeight: 'calc(100vh - 68px)' }} className='flex justify-center'>
      <Stack direction='column' className='flex w-full items-center'>
        <Stack direction='row' className="!grid grid-cols-3">
          <Slide/>
          <Weather/>
        </Stack>

        {sortedTypes && sortedTypes.map((type, i) => (
          <Fragment key={i}>
            <Divider textAlign="left" className="w-full">{mnTypes[i]}</Divider>
            <Grid container spacing={2} className='px-4 !mt-2 min-h-[8rem] h-auto max-w-[100%] !grid grid-cols-4 sm:grid-cols-1'>
              {type.map(data => {
                data = data.data
                return (
                  <div key={data._id} xs={4} className='flex p-2 flex-col h-62 overflow-hidden cursor-pointer' onClick={() => navigate('/article/' + data._id)}>
                    <div className="w-full min-h-[100%] relative p-1 ">
                      {typeof data.poster === 'string' && <img src={data.poster} alt={data.title} className='max-h-[200px] w-full object-cover hp-img' />}
                      <span>{data.title.length >= 80 ? data.title.substring(0, 70) + '...' : data.title}</span>
                    </div>
                  </div>)
              })}
            </Grid>
          </Fragment>
        ))}
      </Stack>
    </Paper>
  )
}

export default HomePage;
