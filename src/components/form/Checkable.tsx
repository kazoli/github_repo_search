type tProps = {
  wrapperClass: string;
  type: 'radio' | 'checkbox';
  id: string;
  checked: boolean;
  action: () => void;
  label: string;
};

function Checkable(props: tProps) {
  return (
    <span className={props.wrapperClass}>
      <input
        type={props.type}
        id={props.id}
        checked={props.checked}
        onChange={props.action}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </span>
  );
}

export default Checkable;
