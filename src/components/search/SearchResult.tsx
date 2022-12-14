import {
  tSearchResultData,
  tSearchReduxState
} from '../../app/search/searchTypes';
import SearchResultTop from './SearchResultTop';
import SearchResultBottom from './SearchResultBottom';
import SearchResultLine from './SearchResultLine';

type tProps = {
  frame:
    | false
    | {
        sort: tSearchReduxState['queryParams']['sort'];
        order: tSearchReduxState['queryParams']['order'];
        page: tSearchReduxState['queryParams']['page'];
        countResults: tSearchReduxState['countResults'];
        countPages: tSearchReduxState['countPages'];
      };
  results: tSearchResultData[];
};

function SearchResult(props: tProps) {
  return (
    <section className="search-result">
      {props.results.length ? (
        <>
          {props.frame && (
            <SearchResultTop
              sort={props.frame.sort}
              order={props.frame.order}
              countResults={props.frame.countResults}
            />
          )}
          <div className="search-result-wrapper">
            {props.results.map((result, index) => (
              <SearchResultLine key={index} data={result} />
            ))}
          </div>
          {props.frame && (
            <SearchResultBottom
              countPages={props.frame.countPages}
              page={props.frame.page}
            />
          )}
        </>
      ) : (
        <div className="search-result-empty-wrapper">
          <div className="search-result-empty">No results</div>
        </div>
      )}
    </section>
  );
}

export default SearchResult;
