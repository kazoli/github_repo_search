import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JumpTop from '../components/general/JumpTop';
import Search from './Search';
import History from './History';
import Page1 from './Page1';
import Page2 from './Page2';
import NotFound from './NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/history" element={<History />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <JumpTop />
      <ToastContainer autoClose={5000} />
    </BrowserRouter>
  );
}

export default Router;
