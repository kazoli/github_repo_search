import { useAppDispatch } from '../../app/general/hooks';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { searchSetParam } from '../../app/search/searchSlice';
import { useSearchContext } from '../../contexts/SearchContext';
import Button from '../form/Button';
import Checkable from '../form/Checkable';
import Input from '../form/Input';
import ErrorMessage from '../general/ErrorMessage';
import SearchAdvanced from './SearchAdvanced';
import SearchButtonBlock from './SearchButtonBlock';

function SearchBar() {
  const dispatch = useAppDispatch();
  const { formParams, formErrors } = useSearchContext();

  return (
    <section className="search-bar">
      <div className="search-row">
        <div className="search-block">
          <div
            className={`form-element ${
              formParams.advanced ? '' : 'expand'
            }`}
          >
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Search by"
              id="keyword"
              placeholder="Minimum 3 characters need to enter"
              value={formParams.keyword}
              action={(value) =>
                dispatch(searchSetParam({ param: 'keyword', value: value }))
              }
              error={
                formParams.keywordErrorShow
                  ? formErrors.keyword
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
                  checked={formParams.inName}
                  label="Name"
                  type="checkbox"
                  id="inName"
                  action={() =>
                    dispatch(
                      searchSetParam({
                        param: 'inName',
                        value: !formParams.inName
                      })
                    )
                  }
                />
                <Checkable
                  wrapperClass="form-checkable"
                  checked={formParams.inDescription}
                  label="Description"
                  type="checkbox"
                  id="inDescription"
                  action={() =>
                    dispatch(
                      searchSetParam({
                        param: 'inDescription',
                        value: !formParams.inDescription
                      })
                    )
                  }
                />
                <Checkable
                  wrapperClass="form-checkable"
                  checked={formParams.inReadme}
                  label="Readme"
                  type="checkbox"
                  id="inReadme"
                  action={() =>
                    dispatch(
                      searchSetParam({
                        param: 'inReadme',
                        value: !formParams.inReadme
                      })
                    )
                  }
                />
              </div>
              <ErrorMessage text={formErrors.searchIn} extraClass="" />
            </div>
          </div>
        </div>
        <div className="search-block">
          {!formParams.advanced && <SearchButtonBlock />}
          <div className="form-element search-advanced">
            <Button
              wrapperClass="button click"
              icon={
                formParams.advanced ? (
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
                    value: !formParams.advanced
                  })
                )
              }
            />
          </div>
        </div>
      </div>
      {formParams.advanced && <SearchAdvanced />}
    </section>
  );
}

export default SearchBar;
