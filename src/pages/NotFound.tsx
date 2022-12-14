import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/layout/DefaultLayout';

function NotFound() {
  useEffect(() => {
    document.title = '404 - Not found';
  }, []);

  return (
    <DefaultLayout>
      <div className="not-found-wrapper">
        <h1>Requested page is not found!</h1>
        <Link to="/" className="link">
          Go back to main page
        </Link>
      </div>
    </DefaultLayout>
  );
}

export default NotFound;
