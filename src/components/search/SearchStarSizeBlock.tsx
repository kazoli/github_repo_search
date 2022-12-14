import { tSearchReduxState } from '../../app/search/searchTypes';
import { useAppDispatch } from '../../app/general/hooks';
import { searchSetParam } from '../../app/search/searchSlice';
import Input from '../form/Input';
import RangePicker from '../general/RangePicker';
import RadioBlock from '../form/RadioBlock';

type tProps = {
  type: 'stars' | 'size';
  data: tSearchReduxState['formParams']['stars' | 'size'];
  formErrors: tSearchReduxState['formErrors'];
};

type tOption = {
  id: string;
  label: string;
  checked: boolean;
  value: tSearchReduxState['formParams']['stars' | 'size']['range'];
};

function SearchStarSizeBlock(props: tProps) {
  const dispatch = useAppDispatch();

  const options: tOption[] = [
    {
      id: `${props.type}Equal`,
      label: 'Equal',
      checked: props.data.range === '=',
      value: '='
    },
    {
      id: `${props.type}Greater`,
      label: 'Greater than',
      checked: props.data.range === '>',
      value: '>'
    },
    {
      id: `${props.type}Less`,
      label: 'Less than',
      checked: props.data.range === '<',
      value: '<'
    },
    {
      id: `${props.type}Between`,
      label: 'Between',
      checked: props.data.range === '..',
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
              param: props.type,
              value: { param: 'range', value: value }
            })
          )
        }
      />
      <div className="form-element-multiple">
        <div className="form-element-inline">
          <Input
            wrapperClass="form-input-wrapper"
            label=""
            type="text"
            id="Number1"
            placeholder={
              props.data.range === '..' ? 'Minimum' : 'Can be empty or number'
            }
            value={props.data.rangeMin}
            action={(value) =>
              dispatch(
                searchSetParam({
                  param: props.type,
                  value: { param: 'rangeMin', value: value }
                })
              )
            }
            error={props.formErrors[`${props.type}Min`]}
          />
        </div>
        {props.data.range === '..' && (
          <>
            <div className="form-element-inline">
              <Input
                wrapperClass="form-input-wrapper"
                label=""
                type="text"
                id="Number2"
                placeholder="Maximum"
                value={props.data.rangeMax}
                action={(value) =>
                  dispatch(
                    searchSetParam({
                      param: props.type,
                      value: { param: 'rangeMax', value: value }
                    })
                  )
                }
                error={props.formErrors[`${props.type}Max`]}
              />
            </div>
            <div className="form-element-inline range-picker-wrapper">
              {props.data.showSlider ? (
                <RangePicker
                  className="slider"
                  range={true}
                  step={1}
                  pushable={false}
                  allowCross={false}
                  min={parseInt(props.data.rangeMin)}
                  max={parseInt(props.data.rangeMax)}
                  defaultValue={[props.data.min, props.data.max]}
                  draggableTrack={true}
                  onChange={(values) => {
                    if (Array.isArray(values)) {
                      dispatch(
                        searchSetParam({
                          param: props.type,
                          value: { param: 'min', value: values[0] }
                        })
                      );
                      dispatch(
                        searchSetParam({
                          param: props.type,
                          value: { param: 'max', value: values[1] }
                        })
                      );
                    }
                  }}
                  tipFormatter={(value) => `${value}`}
                />
              ) : (
                <div className="empty">
                  Slider appears if valid values were entered
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SearchStarSizeBlock;
