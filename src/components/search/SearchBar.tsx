import { tSearchReduxState } from '../../app/search/searchTypes';
import { useAppDispatch } from '../../app/general/hooks';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import Button from '../form/Button';
import Checkable from '../form/Checkable';
import Input from '../form/Input';
import ErrorMessage from '../general/ErrorMessage';
import SearchAdvanced from './SearchAdvanced';
import SearchButtonBlock from './SearchButtonBlock';
import { searchSetParam } from '../../app/search/searchSlice';

type tProps = {
  formParams: tSearchReduxState['formParams'];
  formErrors: tSearchReduxState['formErrors'];
};

function SearchBar(props: tProps) {
  const dispatch = useAppDispatch();

  return (
    <section className="search-bar">
      <div className="search-row">
        <div className="search-block">
          <div
            className={`form-element ${
              props.formParams.advanced ? '' : 'expand'
            }`}
          >
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Search by"
              id="keyword"
              placeholder="Minimum 3 characters need to enter"
              value={props.formParams.keyword}
              action={(value) =>
                dispatch(searchSetParam({ param: 'keyword', value: value }))
              }
              error={
                props.formParams.keywordErrorShow
                  ? props.formErrors.keyword
                  : ''
              }
            />
          </div>
          <div className="form-element">
            <div className="form-checkable-wrapper">
              <label>Search in</label>
              <div className="form-checkable-block">
                <Checkable
                  wrapperClass="form-checkable"
                  checked={props.formParams.inName}
                  label="Name"
                  type="checkbox"
                  id="inName"
                  action={() =>
                    dispatch(
                      searchSetParam({
                        param: 'inName',
                        value: !props.formParams.inName
                      })
                    )
                  }
                />
                <Checkable
                  wrapperClass="form-checkable"
                  checked={props.formParams.inDescription}
                  label="Description"
                  type="checkbox"
                  id="inDescription"
                  action={() =>
                    dispatch(
                      searchSetParam({
                        param: 'inDescription',
                        value: !props.formParams.inDescription
                      })
                    )
                  }
                />
                <Checkable
                  wrapperClass="form-checkable"
                  checked={props.formParams.inReadme}
                  label="Readme"
                  type="checkbox"
                  id="inReadme"
                  action={() =>
                    dispatch(
                      searchSetParam({
                        param: 'inReadme',
                        value: !props.formParams.inReadme
                      })
                    )
                  }
                />
              </div>
              <ErrorMessage text={props.formErrors.searchIn} extraClass="" />
            </div>
          </div>
        </div>
        <div className="search-block">
          {!props.formParams.advanced && (
            <SearchButtonBlock />
          )}
          <div className="form-element search-advanced">
            <Button
              wrapperClass="button click"
              icon={
                props.formParams.advanced ? (
                  <RiArrowUpSLine className="icon" />
                ) : (
                  <RiArrowDownSLine className="icon" />
                )
              }
              label="Advanced"
              action={() =>
                dispatch(
                  searchSetParam({
                    param: 'advanced',
                    value: !props.formParams.advanced
                  })
                )
              }
            />
          </div>
        </div>
      </div>
      {props.formParams.advanced && (
        <SearchAdvanced
          formParams={props.formParams}
          formErrors={props.formErrors}
        />
      )}
    </section>
  );
}

export default SearchBar;
