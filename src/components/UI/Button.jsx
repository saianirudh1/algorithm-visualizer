import './Button.module.css';
function Button(props) {
  return (
    <button
      disabled={props.isDisabled}
      className={props.className}
      onClick={props.onClick}
      data-type={props['data-type']}
    >
      {props.children}
    </button>
  );
}

export default Button;
