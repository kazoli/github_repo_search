import { useEffect } from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';

function Page1() {
  useEffect(() => {
    document.title = 'Page 1';
  }, []);

  return (
    <DefaultLayout>
      <section className="page-wrapper">Page 1</section>
    </DefaultLayout>
  );
}

export default Page1;
