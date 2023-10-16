import { useEffect } from 'react';
import { scrollToElement } from '../../app/general/useful';
import Header from './Header';
import Footer from './Footer';

type tProps = {
  children: JSX.Element;
};

function DefaultLayout(props: tProps) {
  useEffect(() => {
    // scroll top in case of page change
    scrollToElement();
  }, []);

  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
