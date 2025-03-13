// import './TextField.css';

const TextField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  ...rest
}) => {
  return (
    <input
      className="h-20 w-full rounded-xl border border-solid border-[#B3B4BB] px-4 py-2 text-2xl text-[#9A999F] outline-none focus:border-black focus:border-2"
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
