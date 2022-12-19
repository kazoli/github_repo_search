import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/general/hooks';
import { getSearch } from '../app/search/searchThunks';
import { searchBuildUrl, searchResetAction } from '../app/search/searchSlice';
import { searchSettings } from '../app/search/searchInitialStates';
import {
  searchBuildFullUrl,
  searchValidateAll
} from '../app/search/searchMiddleware';
import { SearchContextProvider } from '../contexts/SearchContext';
import SearchValidation from '../components/search/SearchValidation';
import SearchBar from '../components/search/SearchBar';
import DefaultLayout from '../components/layout/DefaultLayout';
import Spinner from '../components/general/Spinner';
import SearchResult from '../components/search/SearchResult';

function Search() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  useEffect(() => {
    document.title = 'Search On GitHub';
  }, []);

  // call real time validations
  SearchValidation({
    formParams: search.formParams
  });

  // manage action
  useEffect(() => {
    switch (search.action) {
      case 'validation':
        // wait for validation trully finishing
        setTimeout(() => {
          if (searchValidateAll(search.formParams, search.formErrors)) {
            // error after validaiton
            dispatch(searchResetAction(true));
          } else {
            // call URL builder
            dispatch(searchBuildUrl());
          }
        }, searchSettings['validationDelayMs']);
        break;
      case 'request':
        // set action default state
        dispatch(searchResetAction(false));
        // request data from GitHub if baseUrl, sort, order, per_page or page number has changed
        dispatch(getSearch(searchBuildFullUrl(search.queryParams)));
        break;
    }
  }, [
    dispatch,
    search.action,
    search.queryParams,
    search.formParams,
    search.formErrors
  ]);

  const searchResult = useMemo(
    () => (
      <SearchResult
        frame={{
          sort: search.queryParams.sort,
          order: search.queryParams.order,
          page: search.queryParams.page,
          countResults: search.countResults,
          countPages: search.countPages
        }}
        results={search.data}
      />
    ),
    [
      search.queryParams.sort,
      search.queryParams.order,
      search.queryParams.page,
      search.countResults,
      search.countPages,
      search.data
    ]
  );

  return (
    <DefaultLayout>
      <SearchContextProvider
        value={{ formParams: search.formParams, formErrors: search.formErrors }}
      >
        <div className="search">
          {search.status === 'loading' && <Spinner />}
          <SearchBar />
          {searchResult}
        </div>
      </SearchContextProvider>
    </DefaultLayout>
  );
}

export default Search;
