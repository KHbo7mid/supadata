import QRCode from 'qrcode.react';
import './QrCard.css';
import '../UserCard/UserCard.css';
import Flag from 'react-world-flags';

export default function QrCard({ user }) {

    const userCardUrl = `http://192.168.56.1:5173/profile/card/${user.userId}`;

    return (
        <div className="fullCard">
            <div className="card">
                <img src={user.cover_src} alt="cover" className="cover_image" />
                <div className="row mb-3">
                    <div className="col-md-6">
                        <img src={user.profile_src} alt="profile" className='profile_image' />
                    </div>
                    {user.company_image && (
                        <div className="col-md-6">
                            <img src={user.company_image} alt="company_logo" className='company_image' />
                        </div>
                    )}
                     { user.job_title==='ambassador' && user.country &&  (
          <div className="col-md-6">
                <Flag code={user.country.key} alt={user.country.label} className='company_image'  />
                </div>
         )

         }
                </div>
                <div className="card_bodyQR">
                    <h2 className="card_title" style={{ fontFamily: user.police }}>
                        {user.name}
                    </h2>
                    <h4 className="job_title mb-3">{user.job_title}</h4>
                    {user.country && <p className="job_title " >{user.country.label}</p>}
                    <div className="qr-code-card">
                        <QRCode
                            value={userCardUrl}
                            size={256}
                            level={"H"}
                            includeMargin={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
