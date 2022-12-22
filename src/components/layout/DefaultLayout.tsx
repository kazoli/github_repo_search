import Header from './Header';
import Footer from './Footer';

type tProps = {
  children: JSX.Element;
};

function DefaultLayout(props: tProps) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
