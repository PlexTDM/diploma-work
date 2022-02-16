import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './components/App';

ReactDOM.render(
  <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}/>
      </Routes>
    </BrowserRouter>
  </Fragment>,
  document.getElementById('root')
);
