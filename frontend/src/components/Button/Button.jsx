import './Button.css';

const Button = ({ type = "button", children, onClick, disabled, ...rest }) => {
  const styles = {
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={styles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
