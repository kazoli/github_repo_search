import { useAppDispatch } from '../../app/general/hooks';
import { searchSetParam } from '../../app/search/searchSlice';
import { tSearchReduxState } from '../../app/search/searchTypes';
import { useSearchContext } from '../../contexts/SearchContext';
import DatePicker from '../general/DatePicker';
import ErrorMessage from '../general/ErrorMessage';
import RadioBlock from '../form/RadioBlock';

type tOption = {
  id: string;
  label: string;
  checked: boolean;
  value: tSearchReduxState['formParams']['created']['range'];
};

function SearchCreatedBlock() {
  const dispatch = useAppDispatch();
  const { search } = useSearchContext();

  const options: tOption[] = [
    {
      id: 'createdBefore',
      label: 'Before',
      checked: search.formParams.created.range === '<',
      value: '<'
    },
    {
      id: 'createdOnBefore',
      label: 'On or before',
      checked: search.formParams.created.range === '<=',
      value: '<='
    },
    {
      id: 'createdAfter',
      label: 'After',
      checked: search.formParams.created.range === '>',
      value: '>'
    },
    {
      id: 'createdOnAfter',
      label: 'On or after',
      checked: search.formParams.created.range === '>=',
      value: '>='
    },
    {
      id: 'createdBetween',
      label: 'Between',
      checked: search.formParams.created.range === '..',
      value: '..'
    }
  ];

  return (
    <>
      <RadioBlock<tOption['value']>
        options={options}
        action={(value) =>
          dispatch(
            searchSetParam({
              param: 'created',
              value: { param: 'range', value: value }
            })
          )
        }
      />
      <div className="form-element-multiple">
        <div>
          <DatePicker
            label={search.formParams.created.range === '..' ? 'From' : 'Date'}
            format="dd.MM.y"
            value={search.formParams.created.min}
            action={(value) =>
              dispatch(
                searchSetParam({
                  param: 'created',
                  value: { param: 'min', value: value }
                })
              )
            }
          />
          <ErrorMessage text={search.formErrors.createdMin} extraClass="" />
        </div>
        {search.formParams.created.range === '..' && (
          <div>
            <DatePicker
              label="To"
              format="dd.MM.y"
              value={search.formParams.created.max}
              action={(value) =>
                dispatch(
                  searchSetParam({
                    param: 'created',
                    value: { param: 'max', value: value }
                  })
                )
              }
            />
            <ErrorMessage text={search.formErrors.createdMax} extraClass="" />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchCreatedBlock;
