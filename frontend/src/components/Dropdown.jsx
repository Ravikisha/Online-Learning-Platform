// import './Dropdown.css';

const Dropdown = ({ options = [], value, onChange, ...rest }) => {
  return (
    <select
      className="h-16 w-[14rem] rounded-xl border border-[#B3B4BB] bg-white px-4 py-1 text-xl text-[#9A999F]"
      value={value}
      onChange={onChange}
      {...rest}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
