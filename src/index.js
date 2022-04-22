// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './components/store';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);
