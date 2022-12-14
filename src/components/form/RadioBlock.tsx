import Checkable from './Checkable';

type tProps<T> = {
  options: { id: string; label: string; checked: boolean; value: T }[];
  action: (value: T) => void;
};

function RadioBlock<T>(props: tProps<T>) {
  return (
    <div className="form-checkable-block">
      {props.options.map((option) => (
        <Checkable
          key={option.id}
          type="radio"
          id={option.id}
          wrapperClass="form-checkable"
          label={option.label}
          checked={option.checked}
          action={() => props.action(option.value)}
        />
      ))}
    </div>
  );
}

export default RadioBlock;
