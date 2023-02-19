import { store } from '../../app/general/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router';
import JumpTop from '../general/JumpTop';

function App() {
  return (
    <Provider store={store}>
      <Router />
      <JumpTop />
      <ToastContainer autoClose={5000} />
    </Provider>
  );
}

export default App;
