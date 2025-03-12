import './Dropdown.css';

const Dropdown = ({ options = [], value, onChange, ...rest }) => {
  return (
    <select className='dropdown' value={value} onChange={onChange} {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;