import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/general/store';
import { BrowserRouter } from 'react-router-dom';
import Search from '../components/pages/Search';

describe('Render search', () => {
  it('should render search correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
  });
});
