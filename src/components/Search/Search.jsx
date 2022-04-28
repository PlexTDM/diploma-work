import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  let { q } = useParams();
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
      const { data } = await axios.get(`${api}/search?&q=${q}`)
      setSearchData(data)
    };
    fetchData();
    return () => {
      setSearchData(null)
    }
  }, [q]);

  // TODO: search input 
  return searchData&&<ShowSearch data={searchData.message} pagination={searchData.count} />



}
export default Search;