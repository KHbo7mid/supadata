import './social.css';

export default function SocialMedia({ id, name, placeholder, icon, afficheURL, value, onChange,onBlur }) {
  const handleFocus = () => {
    if (afficheURL && !value) {
      onChange({ target: { name, value: `https://${id}.com/` } });
    }
  };

 

  const handleInputChange = (event) => {
    onChange(event);
  };

  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor={id}>
          <i className={`${icon} social-icon`}></i>
        </label>
        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          className="form-control"
          onFocus={handleFocus}
          onBlur={onBlur}
          value={value}
          onChange={handleInputChange}
        />
       
      </div>
    </div>
  );
}
