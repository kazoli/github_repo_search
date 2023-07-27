import { useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

function Page2() {
  useEffect(() => {
    document.title = 'Page 2';
  }, []);

  return (
    <DefaultLayout>
      <section className="page-wrapper">
        Page 2 to demonstrate router works correctly
      </section>
    </DefaultLayout>
  );
}

export default Page2;
