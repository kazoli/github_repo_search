import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/general/hooks';
import { searchSelectHistory } from '../app/search/searchSlice';
import { scrollToElement } from '../app/general/useful';
import DefaultLayout from '../components/layout/DefaultLayout';
import SideMenuToogle from '../components/general/SideMenuToogle';
import SearchResult from '../components/search/SearchResult';

function History() {
  useEffect(() => {
    document.title = 'Search History Of GitHub';
  }, []);

  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);
  const [showMenu, setShowMenu] = useState(false);

  const toogle = () => {
    setShowMenu(!showMenu);
    if (showMenu)
      scrollToElement('.search-history-query-list li:first-of-type');
  };

  return (
    <DefaultLayout>
      <div className="search-history">
        {search.history.length ? (
          <>
            <SideMenuToogle
              hideText="Show queries"
              showText="Hide queries"
              show={showMenu}
              action={toogle}
            />
            <div
              className={`search-history-query-wrapper ${
                showMenu ? 'visible' : 'hidden'
              }`}
            >
              <h1 className="search-history-query-title">
                {`Total requests: ${search.history.length}`}
              </h1>
              <ul className="search-history-query-list">
                {search.history.map((data, index) => (
                  <li
                    key={index}
                    onClick={() => dispatch(searchSelectHistory(index))}
                  >
                    {data.query}
                  </li>
                ))}
              </ul>
            </div>
            <div className="search-history-result-wrapper">
              <h1 className="search-history-result-title">Search history</h1>
              <SearchResult
                frame={false}
                results={search.history[search.historySelected].data}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="search-history-result-title">Searh history</h1>
            <div className="search-result-empty">No results</div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
}

export default History;
