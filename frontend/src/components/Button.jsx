// import './Button.css';

const Button = ({ type = "button", children, onClick, disabled, ...rest }) => {
  const styles = {
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
      {...rest}
      className="font-comfortaa h-16 w-full rounded-lg bg-[#FF6347] text-2xl text-white font-bold hover:bg-[#FF4500] focus:outline-[#FF4500]"
    >
      {children}
    </button>
  );
};

export default Button;
