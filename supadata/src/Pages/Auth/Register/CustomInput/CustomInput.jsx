import './CustomInput.css';
export default function CustomInput({ type, name, placeholder, value, onChange, onBlur, error,afficherURL }) {
  const handleClick=()=>{
    if(afficherURL && !value)
    {
      onChange({target: { name, value: 'http://' }})
    }
  };
  return (
    <div className="col-md-4 ">
      <div className="form-group ">
        <input
          type={type}
          name={name}
          className={`form-control ${error ? 'is-invalid' : ''}`} // Add 'is-invalid' class if there's an error
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onClick={handleClick}
        />
        {error && <div className="invalid-feedback">{error}</div>} {/* Display error message */}
      </div>
    </div>
  );
}
