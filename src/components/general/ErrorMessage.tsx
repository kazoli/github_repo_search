type tProps = {
  text: string;
  extraClass: string;
};

function ErrorMessage(props: tProps) {
  return (
    <>
      {props.text && (
        <div className={`error-message ${props.extraClass}`}>{props.text}</div>
      )}
    </>
  );
}

export default ErrorMessage;
