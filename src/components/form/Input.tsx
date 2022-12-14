import ErrorMessage from '../general/ErrorMessage';

type tProps = {
  wrapperClass: string;
  type: 'text' | 'date';
  label: string;
  id: string;
  placeholder: string;
  value: string;
  action: (value: string) => void;
  error: string;
};

function Input(props: tProps) {
  return (
    <div className={props.wrapperClass}>
      {!!props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        autoComplete="off"
        onChange={(event) => props.action(event.target.value)}
      />
      <ErrorMessage text={props.error} extraClass="" />
    </div>
  );
}

export default Input;
