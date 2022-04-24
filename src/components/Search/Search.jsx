import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ShowSearch from './ShowSearch';
const Search = () => {
  let { type, q } = useParams();

  if (!type || type === 'all') type = '';
  if (!q || q === 'all') q = '';
  useEffect(() => {
    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    axios.get(`${api}/search?type=${type}&q=${q}`)
      .then(res => <ShowSearch data={res.data.message} type={type} pagination={res.data.count} />);
  }, [type, q]);
  return <ShowSearch />
}
export default Search;