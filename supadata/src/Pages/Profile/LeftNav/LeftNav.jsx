import { Link} from 'react-router-dom';
import './LeftNav.css';
import logo from '../../../assets/images/logo.png';
import { useAuth } from '../../../Context/AuthContext';

export default function LeftNav({role,logout}) {
  const { user } = useAuth(); 

    return (
        <div className="left-nav">
            <Link to="." className="navbar-brand">
          <img src={logo} alt="supadata" className="logo" />
        </Link>
          <ul className="navbar-nav">
           {role==='entreprise'?(
            <><li className="nav-item">
              <Link className="nav-link" to='addMembers'>
                <i className="fa-solid fa-plus"></i>
                <span className="nav-text">Add Team Members</span>

              </Link>

            </li>
            <li className="nav-item">
                <Link className="nav-link" to=''>
                <i className="bi bi-people"></i>
                <span className="nav-text">Team Members</span>

                </Link>
              </li>
              
              </>
           ):(
              <><li className="nav-item">
                <Link to={`/profile/card/${user.id}`} className="nav-link">
                  <i className="fa-solid fa-address-card"></i>
                  <span className="nav-text">Personal Cards</span>
                </Link>
              </li><li className="nav-item ">
                  <Link to="QrCard" className="nav-link">
                    <i className="fa-solid fa-qrcode"></i>
                    <span className="nav-text ">Personal Cards <strong>(QR)</strong></span>
                  </Link>
                </li>
                <li className="nav-item">
              <Link to="/list-contact" className="nav-link">
                <i className="fa-solid fa-address-book"></i><span className="nav-text">Contacts </span>
                <span className="badge rounded-pill badge-notification bg-danger ms-2">
                  1
                </span>
              </Link>
            </li>
                
                
                </>

           )}

            
    
            <li className="nav-item">
              <Link to="support" className="nav-link">
                <i className="fa fa-question-circle"></i><span className="nav-text">Support </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="fa fa-cog"></i><span className="nav-text">Settings </span>
              </Link>
            </li>
            <li className="nav-item">
            <a className="nav-link" onClick={logout} href="#">
            <i className="fa fa-sign-out" aria-hidden="true"></i> <span className="nav-text">Logout </span>
                    </a>
            </li>
          </ul>
        </div>
    );
}
