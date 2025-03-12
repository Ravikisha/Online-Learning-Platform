import './TextField.css';

const TextField = ({ type = "text", name, placeholder, value, onChange, ...rest }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default TextField;
