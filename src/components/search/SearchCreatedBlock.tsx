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
  const { formParams, formErrors } = useSearchContext();

  const options: tOption[] = [
    {
      id: 'createdBefore',
      label: 'Before',
      checked: formParams.created.range === '<',
      value: '<'
    },
    {
      id: 'createdOnBefore',
      label: 'On or before',
      checked: formParams.created.range === '<=',
      value: '<='
    },
    {
      id: 'createdAfter',
      label: 'After',
      checked: formParams.created.range === '>',
      value: '>'
    },
    {
      id: 'createdOnAfter',
      label: 'On or after',
      checked: formParams.created.range === '>=',
      value: '>='
    },
    {
      id: 'createdBetween',
      label: 'Between',
      checked: formParams.created.range === '..',
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
            label={formParams.created.range === '..' ? 'From' : 'Date'}
            format="dd.MM.y"
            value={formParams.created.min}
            action={(value) =>
              dispatch(
                searchSetParam({
                  param: 'created',
                  value: { param: 'min', value: value }
                })
              )
            }
          />
          <ErrorMessage text={formErrors.createdMin} extraClass="" />
        </div>
        {formParams.created.range === '..' && (
          <div>
            <DatePicker
              label="To"
              format="dd.MM.y"
              value={formParams.created.max}
              action={(value) =>
                dispatch(
                  searchSetParam({
                    param: 'created',
                    value: { param: 'max', value: value }
                  })
                )
              }
            />
            <ErrorMessage text={formErrors.createdMax} extraClass="" />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchCreatedBlock;
