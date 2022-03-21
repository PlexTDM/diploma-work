import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './components/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      {/* </BrowserRouter> */}
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
