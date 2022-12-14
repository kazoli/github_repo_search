import { createContext, useContext, ReactNode } from 'react';
import { tSearchReduxState } from '../app/search/searchTypes';
import { initialSearchReduxState } from '../app/search/searchInitialStates';

// Type of search context
type tSearchContext = {
  search: tSearchReduxState;
};

// Type of props
type tProps = {
  children: ReactNode;
  value: tSearchContext;
};

// Initial state of search context
const searchContextInitialState: tSearchContext = {
  search: initialSearchReduxState
};

// Create context
const SearchContext = createContext<tSearchContext>(searchContextInitialState);

// Context provider
function SearchContextProvider(props: tProps) {
  return (
    <SearchContext.Provider value={props.value}>
      {props.children}
    </SearchContext.Provider>
  );
}

// Context custom hook
function useSearchContext() {
  return useContext(SearchContext);
}

export { SearchContext, SearchContextProvider, useSearchContext };
