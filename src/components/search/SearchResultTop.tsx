import { tSearchReduxState } from '../../app/search/searchTypes';
import { useAppDispatch } from '../../app/general/hooks';
import RadioBlock from '../form/RadioBlock';
import { searchSetQueryParams } from '../../app/search/searchSlice';

type tProps = {
  sort: tSearchReduxState['queryParams']['sort'];
  order: tSearchReduxState['queryParams']['order'];
  countResults: tSearchReduxState['countResults'];
};

type tSortOption = {
  id: string;
  label: string;
  checked: boolean;
  value: tSearchReduxState['queryParams']['sort'];
};

type tOrderOption = {
  id: string;
  label: string;
  checked: boolean;
  value: tSearchReduxState['queryParams']['order'];
};

function SearchResultTop(props: tProps) {
  const dispatch = useAppDispatch();

  const sortOptions: tSortOption[] = [
    {
      id: 'searchResultUpdated',
      label: 'Default',
      checked: props.sort === '',
      value: ''
    },
    {
      id: 'searchResultStars',
      label: 'Stars',
      checked: props.sort === 'stars',
      value: 'stars'
    },
    {
      id: 'searchResultForks',
      label: 'Forks',
      checked: props.sort === 'forks',
      value: 'forks'
    }
  ];

  const orderOptions: tOrderOption[] = [
    {
      id: 'searchResultDesc',
      label: 'Descend',
      checked: props.order === 'desc',
      value: 'desc'
    },
    {
      id: 'searchResultAsc',
      label: 'Ascend',
      checked: props.order === 'asc',
      value: 'asc'
    }
  ];
  return (
    <div className="search-result-frame">
      <div className="form-element-inline expand">
        <label>Total results</label>
        {props.countResults}
      </div>
      <div className="form-element-block">
        <div className="form-element-inline">
          <label>Sort</label>
          <RadioBlock<tSortOption['value']>
            options={sortOptions}
            action={(value) =>
              dispatch(searchSetQueryParams({ param: 'sort', value: value }))
            }
          />
        </div>
        <div className="form-element-inline">
          <label>Order by</label>
          <RadioBlock<tOrderOption['value']>
            options={orderOptions}
            action={(value) =>
              dispatch(searchSetQueryParams({ param: 'order', value: value }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResultTop;
