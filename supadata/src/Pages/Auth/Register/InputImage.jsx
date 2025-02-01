
export default function InputImage({ id, name, handleFileChange, setPreview, Preview, label, error,clearField }) {
  return (
    <div className="form-group">
      <input
        type="file"
        id={id}
        name={name}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(event) => handleFileChange(event, name, setPreview)}
      />
      <label 
        htmlFor={id} 
        className="file-upload-label" 
        style={{ display: Preview ? 'none' : 'block', cursor: 'pointer' }}
      >
        <span className="plus-icon">+</span> {label}
      </label>
      <button
        className="suppBtn"
        style={{ display: Preview ? 'inline-block' : 'none' }}
        onClick={(e) => {
          e.preventDefault();
          setPreview(null);
          
          document.getElementById(id).value = null; 
          clearField(name);
        }}
      >
        X
      </button>
      {Preview && (
        <div id="Container" className="imgStyle">
          <img src={Preview} alt="Preview" />
        </div>
      )}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}
