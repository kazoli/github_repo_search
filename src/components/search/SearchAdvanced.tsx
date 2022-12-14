import {
  RiStarSFill,
  RiArrowUpDownFill,
  RiCalendar2Fill
} from 'react-icons/ri';
import { useAppDispatch } from '../../app/general/hooks';
import { searchSettings } from '../../app/search/searchInitialStates';
import { searchManageTag, searchSetParam } from '../../app/search/searchSlice';
import { tSearchReduxState } from '../../app/search/searchTypes';
import Input from '../form/Input';
import Tags from '../general/Tags';
import SearchButtonBlock from './SearchButtonBlock';
import SearchCreatedBlock from './SearchCreatedBlock';
import SearchStarSizeBlock from './SearchStarSizeBlock';

type tProps = {
  formParams: tSearchReduxState['formParams'];
  formErrors: tSearchReduxState['formErrors'];
};

function SearchAdvanced(props: tProps) {
  const dispatch = useAppDispatch();

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
              value={props.formParams.user}
              action={(value) =>
                dispatch(searchSetParam({ param: 'user', value: value }))
              }
              error={props.formErrors.user}
            />
          </div>
          <div className="form-element">
            <Input
              wrapperClass="form-input-wrapper"
              type="text"
              label="Organization"
              id="org"
              placeholder="Can be empty or 3 characters at least"
              value={props.formParams.org}
              action={(value) =>
                dispatch(searchSetParam({ param: 'org', value: value }))
              }
              error={props.formErrors.org}
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
              value={props.formParams.languageDraft}
              action={(value) =>
                dispatch(
                  searchSetParam({ param: 'languageDraft', value: value })
                )
              }
              error={props.formErrors.languageDraft}
            />
            <Tags
              tagMaxVisible={searchSettings.tagMaxVisible}
              tags={props.formParams.language}
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
              value={props.formParams.topicDraft}
              action={(value) =>
                dispatch(searchSetParam({ param: 'topicDraft', value: value }))
              }
              error={props.formErrors.topicDraft}
            />
            <Tags
              tagMaxVisible={searchSettings.tagMaxVisible}
              tags={props.formParams.topic}
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
              data={props.formParams.stars}
              formErrors={props.formErrors}
            />
          </div>
          <div className="form-element highlighted">
            <label>
              <RiArrowUpDownFill />
              <span>Size</span>
            </label>
            <SearchStarSizeBlock
              type="size"
              data={props.formParams.size}
              formErrors={props.formErrors}
            />
          </div>
        </div>
        <div className="search-block">
          <div className="form-element highlighted">
            <label>
              <RiCalendar2Fill />
              <span>Created</span>
            </label>
            <SearchCreatedBlock
              formParams={props.formParams}
              formErrors={props.formErrors}
            />
          </div>
          <SearchButtonBlock />
        </div>
      </div>
    </>
  );
}

export default SearchAdvanced;
