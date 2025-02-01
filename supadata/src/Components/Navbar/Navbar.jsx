import './navbar.css';
import { useAuth } from '../../Context/AuthContext';
import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import Links from '../Links/Links';
import { Link } from 'react-router-dom';
import CardTypeDialog from '../CardTypeDialog/CardTypeDialog';

export default function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container">
       

        {!user ? (
          <>
           <Link to="#" className="navbar-brand">
          <img src={logo} alt="supadata" className="logo" />
        </Link>
            <button
              className="navbar-toggler"
              onClick={handleCollapse}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainmenu"
            >
              {isCollapsed ? (
                <span className="navbar-toggler-icon"></span>
              ) : (
                <i className="fa-solid fa-x iconX"></i>
              )}
            </button>
            <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="mainmenu">
              <Links />
              <Link to="/login" className="nav-link login-link fw-bold">
                Login
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger rounded-pill create-card-btn"
                onClick={handleOpenDialog}
              >
                Create Your Card
              </button>
            </div>
          </>
        ) : (
          <>
          </>
        )}
      </div>
      <CardTypeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
}
