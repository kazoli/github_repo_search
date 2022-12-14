import { tSearchResultData } from '../../app/search/searchTypes';
import { formatDate } from '../../app/search/searchMiddleware';
import Tags from '../general/Tags';
import no_image from '../../utils/no_image.png';

type tProps = {
  data: tSearchResultData;
};

function SearchResultLine(props: tProps) {
  return (
    <div className="search-result-line">
      <div className="search-result-block">
        <div className="search-result-block">
          <div className="search-result-element">
            <div>{props.data.name}</div>
            <a
              className="link"
              href={props.data.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {props.data.full_name}
            </a>
          </div>
          <div className="search-result-element">
            <div>{`Stars: ${props.data.stargazers_count}`}</div>
            <div>{`Watchers: ${props.data.watchers_count}`}</div>
          </div>
        </div>
        <div className="search-result-block">
          <div className="search-result-element">
            <div>{`Forks: ${props.data.forks_count}`}</div>
            <div>{`Issues: ${props.data.open_issues_count}`}</div>
          </div>
          <div className="search-result-element">
            <div className="cut-string-end" title={props.data.description}>
              {props.data.description}
            </div>
          </div>
        </div>
      </div>
      <div className="search-result-block">
        <div className="search-result-block">
          <div className="search-result-element">
            {(props.data.language || !!props.data.topics.length) && (
              <Tags
                tagMaxVisible={1}
                tags={
                  props.data.language
                    ? [props.data.language, ...props.data.topics]
                    : props.data.topics
                }
                removeTag={false}
              />
            )}
          </div>
          <div className="search-result-element">
            <div>{`Created at: ${formatDate(
              'YYYY.MM.DD',
              props.data.created_at
            )}`}</div>
            <div>{`Updated at: ${formatDate(
              'YYYY.MM.DD',
              props.data.updated_at
            )}`}</div>
          </div>
        </div>
        <div className="search-result-block">
          <div className="search-result-element">
            <div>{`By: ${props.data.owner.login}`}</div>
          </div>
          <div className="search-result-element">
            <img
              className="search-result-image"
              src={props.data.owner.avatar_url}
              alt={props.data.owner.login}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevents looping
                e.currentTarget.src = no_image; // loads no image
              }}
              onClick={() => window.open(props.data.owner.html_url, '_blank')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultLine;
