import {
  RiStarSFill,
  RiArrowUpDownFill,
  RiCalendar2Fill
} from 'react-icons/ri';
import { useAppDispatch } from '../../app/general/hooks';
import { searchSettings } from '../../app/search/searchInitialStates';
import { searchManageTag, searchSetParam } from '../../app/search/searchSlice';
import { useSearchContext } from '../../contexts/SearchContext';
import Input from '../form/Input';
import Tags from '../general/Tags';
import SearchButtonBlock from './SearchButtonBlock';
import SearchCreatedBlock from './SearchCreatedBlock';
import SearchStarSizeBlock from './SearchStarSizeBlock';

function SearchAdvanced() {
  const dispatch = useAppDispatch();
  const { formParams, formErrors } = useSearchContext();

  return (
    <>
      <div className="search-row">
        <div className="search-block">
          <div className="form-element">
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Username"
              id="user"
              placeholder="Can be empty or 3 characters at least"
              value={formParams.user}
              action={(value) =>
                dispatch(searchSetParam({ param: 'user', value: value }))
              }
              error={formErrors.user}
            />
          </div>
          <div className="form-element">
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Organization"
              id="org"
              placeholder="Can be empty or 3 characters at least"
              value={formParams.org}
              action={(value) =>
                dispatch(searchSetParam({ param: 'org', value: value }))
              }
              error={formErrors.org}
            />
          </div>
        </div>
        <div className="search-block">
          <div className="form-element">
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Language"
              id="language"
              placeholder={`Add a tag after ${
                searchSettings.validationDelayMs / 1000
              }-second stop in type`}
              value={formParams.languageDraft}
              action={(value) =>
                dispatch(
                  searchSetParam({ param: 'languageDraft', value: value })
                )
              }
              error={formErrors.languageDraft}
            />
            <Tags
              tagMaxVisible={searchSettings.tagMaxVisible}
              tags={formParams.language}
              removeTag={(value) =>
                dispatch(
                  searchManageTag({
                    param: 'language',
                    createFrom: false,
                    value: value
                  })
                )
              }
            />
          </div>
          <div className="form-element">
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Topic"
              id="topic"
              placeholder={`Add a tag after ${
                searchSettings.validationDelayMs / 1000
              }-second stop in type`}
              value={formParams.topicDraft}
              action={(value) =>
                dispatch(searchSetParam({ param: 'topicDraft', value: value }))
              }
              error={formErrors.topicDraft}
            />
            <Tags
              tagMaxVisible={searchSettings.tagMaxVisible}
              tags={formParams.topic}
              removeTag={(value) =>
                dispatch(
                  searchManageTag({
                    param: 'topic',
                    createFrom: false,
                    value: value
                  })
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="search-row wide">
        <div className="search-block">
          <div className="form-element highlighted">
            <label>
              <RiStarSFill />
              <span>Stars</span>
            </label>
            <SearchStarSizeBlock
              type="stars"
              data={formParams.stars}
              formErrors={formErrors}
            />
          </div>
          <div className="form-element highlighted">
            <label>
              <RiArrowUpDownFill />
              <span>Size</span>
            </label>
            <SearchStarSizeBlock
              type="size"
              data={formParams.size}
              formErrors={formErrors}
            />
          </div>
        </div>
        <div className="search-block">
          <div className="form-element highlighted">
            <label>
              <RiCalendar2Fill />
              <span>Created</span>
            </label>
            <SearchCreatedBlock />
          </div>
          <SearchButtonBlock />
        </div>
      </div>
    </>
  );
}

export default SearchAdvanced;
