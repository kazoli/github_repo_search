import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import JumpTop from '../general/JumpTop';

type tProps = {
  children: JSX.Element;
};

function DefaultLayout(props: tProps) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
      <JumpTop />
      <ToastContainer autoClose={5000} />
    </>
  );
}

export default DefaultLayout;
