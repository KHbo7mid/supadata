import { useAuth } from "../../Context/AuthContext";
import '../../Components/Navbar/navbar.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../Api/Axios";
export default function ProfileNav() {
    const { user, logout } = useAuth();
const navigate = useNavigate();   
const handleEditCard = (role, userId) => {
  let path;
  if (role === 'particulier') {
      path = `/register/${userId}`; 
  } else if (role === 'ambassador') {
      path = `/ambassador/${userId}`; 
  } else if (role === 'entreprise') {
      path = `/team/${userId}`; 
  }
  navigate(path);
};
    const deleteAccount = async () => {
      if (window.confirm('Are you sure you want to delete your account? ')) {
          try {
              const userId = user.id; 
              const token = localStorage.getItem('token'); 

              await axiosInstance.delete(`/user/${userId}`, {
                  headers: {
                      Authorization: `Bearer ${token}` 
                  }
              });

              alert('Account deleted successfully');
              logout(); 
              navigate('/'); 
          } catch (error) {
              alert('Failed to delete account');
              console.error(error); 
          }
      }
  };
  return (
    <div className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container">
      <>
            <ul className="navbar-nav ms-auto d-flex flex-row  btnUl pb-2  ">
              <li>
                <button
                  type="button"
                  className="btn btn-primary shareBtn "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditCard(user.role,user.id)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  Edit card
                </button>
                <button
                  type="button"
                  className="btn btn-primary shareBtn "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-share-nodes"></i>
                  Share card
                </button>
              </li>
              <li className="nav-item dropdown dropDown">
                <a
                  className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.role==='entreprise'? (<><span className="userName_css">{user.company_name}</span><img
                                  src={`${user.company_logo}`}
                                  className=" top_img"
                                  height="45"
                                  width='20'
                                  alt="Avatar"
                                  loading="lazy" /></>):(<><span className="userName_css">{user.name}</span><img
                                      src={`${user.profile_picture}`}
                                      className=" top_img"
                                      height="45"
                                      width='20'
                                      alt="Avatar"
                                      loading="lazy" /></>)}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a className="dropdown-item" href="#" type="button" onClick={deleteAccount}>
                      Delete account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logout} href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </>
      </div>
    </div>
  )
}
