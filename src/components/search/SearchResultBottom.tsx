import { tSearchReduxState } from '../../app/search/searchTypes';
import { BiArrowToLeft, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { useAppDispatch } from '../../app/general/hooks';
import { searchSetQueryParams } from '../../app/search/searchSlice';

type tProps = {
  countPages: tSearchReduxState['countPages'];
  page: tSearchReduxState['queryParams']['page'];
};

function SearchResultBottom(props: tProps) {
  const dispatch = useAppDispatch();
  const prevPage = props.page === '1' ? false : `${parseInt(props.page) - 1}`;
  const nextPage =
    props.page === `${props.countPages}`
      ? false
      : `${parseInt(props.page) + 1}`;

  return (
    <div className="search-result-frame">
      <div className="form-element-inline expand">
        <label>Current page</label>
        {`${props.page} of ${props.countPages}`}
      </div>
      <div className="form-element-inline button-block">
        {prevPage ? (
          <>
            <button
              className="button click"
              onClick={() =>
                dispatch(
                  searchSetQueryParams({
                    param: 'page',
                    value: prevPage
                  })
                )
              }
            >
              <BiArrowToLeft />
              <span>First</span>
            </button>
            <button
              className="button click"
              onClick={() =>
                dispatch(
                  searchSetQueryParams({
                    param: 'page',
                    value: prevPage
                  })
                )
              }
            >
              <BiLeftArrowAlt />
              <span>Prev</span>
            </button>
          </>
        ) : (
          <button className="button disabled">
            <BiLeftArrowAlt />
            <span>Prev</span>
          </button>
        )}
        {nextPage ? (
          <button
            className="button click"
            onClick={() =>
              dispatch(
                searchSetQueryParams({
                  param: 'page',
                  value: nextPage
                })
              )
            }
          >
            <span>Next</span>
            <BiRightArrowAlt />
          </button>
        ) : (
          <button className="button disabled">
            <span>Next</span>
            <BiRightArrowAlt />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchResultBottom;
