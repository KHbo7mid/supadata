import './Button.css';


export default function Button({title,onClick }) {
  return (
    <button className='custom-button ' onClick={onClick}>
      
        {title}
     
      <div className="arrow-wrapper">
        <div className="arrow"></div>
      </div>
    </button>
  );
}
