import { useParams } from 'react-router-dom';
import './UserCard.css';
import Flag from 'react-world-flags';
import profile_photo from '../../../assets/images/profile.png';

export default function UserCard({
  cover_src,
  profile_src,
  company_image,
  name,
  role,
  job_title,
  email,
  phone,
  url_company,
  address,
  color,
  police,
  country,
  isFullScreen,
  socialMedia,   
  messaging,    
  business  ,
  company_name    
})



{


  const { userId } = useParams();
  return (
    <div className={isFullScreen? 'fullCard':'cardContainer'}>
      <div className="card">
        <img src={cover_src} alt="cover" className="cover_image" />
        <div className="row mb-3">
          <div className="col-md-6">
            {role==='entreprise'? <img src={profile_photo}  alt="profile" className='profile_image'/>
            :
                        <img src={profile_src} alt="profile" className='profile_image' />
}
          </div>
          {company_image && (
            <div className="col-md-6">
              <img src={company_image} alt="company_logo" className='company_image' />
            </div>
          )}
           { job_title==='ambassador' && country &&  (
          <div className="col-md-6">
                <Flag code={country.key} alt={country.label} className='company_image'  />
                </div>
         )

         }
        </div>
        <div className="card_body">
          <h2 className="card_title"
          style={{
            fontFamily:police,
          }}
          >{role==='entreprise'? company_name : name}</h2>
          <h4 className="job_title mb-3">{job_title}</h4>
          {country && <p>{country.label}</p>}
          <div className='Infos '>
            {!isFullScreen &&             <div className="sous_title">{role==='entreprise'? 'Company' : 'Personal'} Info</div>
            }
            <ul>
              <li>
                <a href={`mailto:${email}`}>
                  <i className='fa fa-envelope'></i>
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${phone}`}>
                  <i className='fa fa-phone' aria-hidden='true'></i>
                  {phone}
                </a>
              </li>
              {url_company && (
                <li>
                  <a href={url_company}>
                    <i className='fa fa-globe' aria-hidden='true'></i>
                    {url_company}
                  </a>
                </li>
              )}
              <li>
                <a href="#">
                  <i aria-hidden='true' className='fa fa-map-marker'></i>
                  {address}
                </a>
              </li>
              {socialMedia['url_link'] && role==='particulier' &&(
                <>
                {!isFullScreen &&                   <div className="sous_title">Social Media</div>
                }
                  {socialMedia.map((social, index) => (
                    <li key={index}>
                      <a href={social.url_link}>
                        <i className={`fa-brands fa-${social.name}`}></i>
                        {social.name}
                      </a>
                      
                    </li>
                  ))
                  
                  }
                </>
              )}
              {messaging['url_link'] && (
                <>
                {!isFullScreen &&                   <div className="sous_title">Messaging</div>
                }
                  {messaging.map((messaging, index) => (
                    <li key={index}>
                      <a href={messaging.url_link}>
                        <i className={`fa-brands fa-${messaging.name}`}></i>
                        {messaging.name}
                      </a>
                    </li>
                  ))}
                </>
              )}
              {business['url_link'] && role==='particulier' && (
                <>
                {!isFullScreen && <div className="sous_title">Business</div>
                }
                  {business.map((business, index) => (
                    <li key={index}>
                      <a href={business.url_link}>
                        <i className={`fa-brands fa-${business.name}`}></i>
                        {business.name}
                      </a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
        {isFullScreen && (
          <div className="btn_container">
            <button
              type="button"
              className="btn_save"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Save Contact
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
