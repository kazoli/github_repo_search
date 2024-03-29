import { useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';

function Page1() {
  useEffect(() => {
    document.title = 'Page 1';
  }, []);

  return (
    <DefaultLayout>
      <section className="page-wrapper">
        Page 1 to demonstrate router works correctly
      </section>
    </DefaultLayout>
  );
}

export default Page1;
