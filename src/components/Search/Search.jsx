import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  let { type, q } = useParams();
  const [searchData, setSearchData] = useState(null);

  if (!type || type === 'all') type = '';
  if (!q || q === 'all') q = '';
  useEffect(() => {
    const fetchData = async () => {
      const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
      const { data } = await axios.get(`${api}/search?type=${type}&q=${q}`)
      setSearchData(data)
    };
    fetchData();
    return () => {
      setSearchData(null)
    }
  }, [type, q]);

  return searchData&&<ShowSearch data={searchData.message} type={type} pagination={searchData.count} />



}
export default Search;