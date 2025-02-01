import { Link } from "react-router-dom";
import Button from '../Button/Button';
import './CardTypeDialog.css';
export default function CardTypeDialog({ isOpen, onClose }) {
    if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
        <div className="dialog" onClick={(e) => e.stopPropagation()}>
        
            <h2 className="mb-3">Select Card Type</h2>
            <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            <Link to={'/register'}><Button title={"Personal Business Card"}/></Link>
            <Link to={'/ambassador'}><Button title={"Ambassador Card"}/></Link>
        </div>
      
    </div>
  )
}
