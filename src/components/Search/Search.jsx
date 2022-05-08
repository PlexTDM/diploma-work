import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
import { InputAdornment, Paper, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  let { q } = useParams();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(null);
  const [inputval, setInputval] = useState(q);

  useEffect(() => {
    const fetchData = async () => {
      const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
      const { data } = await axios.get(`${api}/search?&q=${q}`)
      setSearchData(data)
    };
    fetchData();
    console.count('Search');
    return () => {
      setSearchData(null)
    }
  }, [q]);

  // TODO: search input 
  return (
    <Paper elevation={24}>
      <div className='flex w-full items-center h-min flex-col'>
        <TextField value={inputval} placeholder='Хайх' onChange={e => setInputval(e.target.value)}
          InputProps={{
            endAdornment: (<InputAdornment position="end">
              <IconButton onClick={()=>navigate('/search/'+inputval)}><SearchIcon/></IconButton>
            </InputAdornment>)
          }}
        />
      </div>
      {searchData && searchData.length !== 0 && <ShowSearch data={searchData.message} pagination={searchData.count} />}
    </Paper>
  )
  // return searchData&&<ShowSearch data={searchData.message} pagination={searchData.count} />



}
export default Search;