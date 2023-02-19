import { createContext, useContext, ReactNode } from 'react';
import { tSearchReduxState } from '../../app/search/searchTypes';
import { initialSearchReduxState } from '../../app/search/searchInitialStates';

// Type of search context
type tSearchContext = {
  formParams: tSearchReduxState['formParams'];
  formErrors: tSearchReduxState['formErrors'];
};

// Type of props
type tProps = {
  children: ReactNode;
  value: tSearchContext;
};

// Initial state of search context
const searchContextInitialState: tSearchContext = {
  formParams: initialSearchReduxState['formParams'],
  formErrors: initialSearchReduxState['formErrors']
};

// Create context
const SearchContext = createContext(searchContextInitialState);

// Context custom hook
function useSearchContext() {
  return useContext(SearchContext);
}

// Context provider
function SearchContextProvider(props: tProps) {
  return (
    <SearchContext.Provider value={props.value}>
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchContextProvider, useSearchContext };
