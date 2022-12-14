type tProps = {
  trigger: JSX.Element;
  options: { [key: string]: string };
  action: (value: string) => void;
};

function DropDownMenu(props: tProps) {
  return (
    <>
      {props.trigger}
      <ul className="drop-down-menu">
        {Object.keys(props.options).map((key, index) => (
          <li key={index} onClick={() => props.action(key)}>
            {props.options[key]}
          </li>
        ))}
      </ul>
    </>
  );
}

export default DropDownMenu;
