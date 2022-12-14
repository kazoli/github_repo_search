import { IoCloseSharp } from 'react-icons/io5';

type tProps = {
  tag: string;
  removeTag: false | ((value: string) => void);
};

function Tag(props: tProps) {
  return (
    <span className="tag">
      {props.tag}
      {props.removeTag && (
        <IoCloseSharp
          className="remove"
          onClick={() => props.removeTag && props.removeTag(props.tag)}
        />
      )}
    </span>
  );
}

export default Tag;
