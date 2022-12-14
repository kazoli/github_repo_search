type tProps = {
  wrapperClass: string;
  action: () => void;
  label: string;
  icon: false | JSX.Element;
};

function Button(props: tProps) {
  return (
    <button className={props.wrapperClass} onClick={props.action}>
      {props.icon}
      {props.label}
    </button>
  );
}

export default Button;
