import './Button.module.css';
function Button(props) {
  return (
    <button
      disabled={props.isDisabled}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
