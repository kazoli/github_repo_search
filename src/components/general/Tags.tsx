import { useState, useMemo } from 'react';
import Tag from './Tag';

type tProps = {
  tagMaxVisible: number;
  tags: string[];
  removeTag: false | ((value: string) => void);
};

function Tags(props: tProps) {
  const [show, setShow] = useState(false);

  const data = useMemo(() => {
    const tagNumber = props.tags.length;
    const slicedTags = props.tags.slice(0, props.tagMaxVisible);
    let more;
    if (tagNumber > props.tagMaxVisible) {
      more = (
        <span className="tag-more" onClick={() => setShow(true)}>{`...${
          tagNumber - props.tagMaxVisible
        } more`}</span>
      );
    } else {
      setShow(false);
      more = false;
    }
    return {
      tagNumber: tagNumber,
      slicedTags: slicedTags,
      more: more
    };
  }, [props.tags, props.tagMaxVisible]);

  return (
    <div className="tag-container">
      <div className="tag-wrapper">
        {data.slicedTags.map((tag, index) => (
          <Tag key={index} tag={tag} removeTag={props.removeTag} />
        ))}
        {data.more}
      </div>
      {data.more && (
        <div
          className="tag-wrapper popup"
          style={{ display: show ? 'flex' : 'none' }}
        >
          {props.tags.map((tag, index) => (
            <Tag key={index} tag={tag} removeTag={props.removeTag} />
          ))}
          <span className="tag-less" onClick={() => setShow(false)}>
            Show less
          </span>
        </div>
      )}
    </div>
  );
}

export default Tags;
