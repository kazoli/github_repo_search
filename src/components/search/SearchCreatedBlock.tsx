import { tSearchReduxState } from '../../app/search/searchTypes';
import { useAppDispatch } from '../../app/general/hooks';
import { searchSetParam } from '../../app/search/searchSlice';
import DatePicker from '../general/DatePicker';
import ErrorMessage from '../general/ErrorMessage';
import RadioBlock from '../form/RadioBlock';

type tProps = {
  formParams: tSearchReduxState['formParams'];
  formErrors: tSearchReduxState['formErrors'];
};

type tOption = {
  id: string;
  label: string;
  checked: boolean;
  value: tSearchReduxState['formParams']['created']['range'];
};

function SearchCreatedBlock(props: tProps) {
  const dispatch = useAppDispatch();

  const options: tOption[] = [
    {
      id: 'createdBefore',
      label: 'Before',
      checked: props.formParams.created.range === '<',
      value: '<'
    },
    {
      id: 'createdOnBefore',
      label: 'On or before',
      checked: props.formParams.created.range === '<=',
      value: '<='
    },
    {
      id: 'createdAfter',
      label: 'After',
      checked: props.formParams.created.range === '>',
      value: '>'
    },
    {
      id: 'createdOnAfter',
      label: 'On or after',
      checked: props.formParams.created.range === '>=',
      value: '>='
    },
    {
      id: 'createdBetween',
      label: 'Between',
      checked: props.formParams.created.range === '..',
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
            label={props.formParams.created.range === '..' ? 'From' : 'Date'}
            format="dd.MM.y"
            value={props.formParams.created.min}
            action={(value) =>
              dispatch(
                searchSetParam({
                  param: 'created',
                  value: { param: 'min', value: value }
                })
              )
            }
          />
          <ErrorMessage text={props.formErrors.createdMin} extraClass="" />
        </div>
        {props.formParams.created.range === '..' && (
          <div>
            <DatePicker
              label="To"
              format="dd.MM.y"
              value={props.formParams.created.max}
              action={(value) =>
                dispatch(
                  searchSetParam({
                    param: 'created',
                    value: { param: 'max', value: value }
                  })
                )
              }
            />
            <ErrorMessage text={props.formErrors.createdMax} extraClass="" />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchCreatedBlock;
