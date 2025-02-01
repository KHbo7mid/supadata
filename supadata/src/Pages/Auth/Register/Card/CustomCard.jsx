import './Card.css';
import profile_photo from '../../../../assets/images/profile.png';
import "bootstrap-icons/font/bootstrap-icons.css";
import Flag from 'react-world-flags';

export default function CustomCard({ company_logo,cover_photo, profile_picture, name, email,job_title,phone,address,country,color,police,url_company}) {
  
  return (
    <div className="cardLive">
      <div className="bg">
        {cover_photo ? (
          <img src={cover_photo} alt="Cover" className="cover-photo" />
        ) : (
          <div className='cover'></div>
        )}
        <div className="profile-container">
          <img 
            src={profile_picture || profile_photo} 
            alt="Profile" 
            className="profile-picture" 
          />
         
          </div>
          {company_logo && (
            <div className="col-md-6">

              <img src={company_logo} alt="company_logo" className='company_logo' />
            </div>
          )}
         { job_title==='ambassador' && country &&  (
          <div className="col-md-6">
                <Flag code={country?.key} alt={country?.label} className='company_logo'  />
                </div>
         )

         }
          <div className="card-details">
            {name && <h4 style={{fontFamily:police}}>{name}</h4>}
           <span>
           {job_title && <p>{job_title}</p>}
           {country && <p>{country?.label}</p>}
           </span>
          
         <div className="personelInfo">
         {email && <li>
            <i className="fa fa-envelope" aria-hidden="true" style={{background:color}}></i>{email}
            </li>}
            {phone && <li>
            <i className="fa fa-phone" aria-hidden="true" style={{background:color}}></i>{phone}
            </li>}
            {address && <li>
            <i className="fa fa-map-marker" aria-hidden="true" style={{background:color}}></i>{address}
            </li>}
            {url_company && (
              <li>
                <i className="fa fa-globe" aria-hidden="true" style={{background:color}}></i>{url_company}
              </li>
            )}
         </div>
          </div>
         
        
      </div>
      <div className="blob"></div>
    </div>
  );
}
