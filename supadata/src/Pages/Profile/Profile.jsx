import { useAuth } from '../../Context/AuthContext';
import LeftNav from './LeftNav/LeftNav';
import UserCard from './UserCard/UserCard';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';
import Support from './Support/Support';
import QrCard from './QrCard/QrCard';
import ProfileNav from './ProfileNav';
import AddMembers from './TeamProfile/AddMembers';
export default function Profile() {
    const { user,logout } = useAuth();
    const location = useLocation();
    const isFullScreen = location.pathname.startsWith('/profile/card');
    const navigate = useNavigate();




    
    const socialLinks = user.socialLinks || [];
    const socialMedia = socialLinks.filter(link =>
        link.name.includes('facebook') ||
        link.name.includes('x') ||
        link.name.includes('instagram') ||
        link.name.includes('linkedin') ||
        link.name.includes('youtube') ||
        link.name.includes('snapchat') ||
        link.name.includes('tiktok') ||
        link.name.includes('twitch') ||
        link.name.includes('yelp')
    );
    const messaging = socialLinks.filter(link =>
        link.name.includes('whatsapp') ||
        link.name.includes('telegram') ||
        link.name.includes('skype') ||
        link.name.includes('discord') ||
        link.name.includes('signal')
    );
    const business = socialLinks.filter(link =>
        link.name.includes("github") ||
        link.name.includes('gitlab')
    );
    const ambassador = user.ambassadorDetails || {};
    const country = ambassador.country_key && ambassador.country_name 
        ? { key: ambassador.country_key, label: ambassador.country_name } 
        : null;

     



    const userCardProps = {
      userId: user.id,
      role:user.role,
        cover_src: `${user.cover_photo}`,
        profile_src: `${user.profile_picture}`,
        company_image: user.company_logo ? `${user.company_logo}` : null,
        name: user.name,
        job_title: user.job_title,
        email: user.email,
        phone: user.phone,
        url_company: user.url_company,
        address: user.address,
        color: user.color,
        police: user.police,
       country,
       company_name:user.company_name,
        socialMedia,
        messaging,
        business,
    };
 
 
 

    const handleClose = () => {
        navigate('/profile');
    };

    return (
        <>
            {!isFullScreen && <ProfileNav />}
            {!isFullScreen && <LeftNav role={user.role} logout={logout} />}
            <Routes>
                <Route 
                    path="/" 
                    element={<UserCard {...userCardProps} />} 
                />
                <Route 
                    path="card/:userId" 
                    element={
                        <div className="fullscreen-user-card">
                            <button onClick={handleClose} className="close-button">X</button>
                            <UserCard {...userCardProps} isFullScreen={true} />
                        </div>
                    } 
                />
                <Route
                path='addMembers'
                element={
                    <AddMembers id={user.id}/>
                }
                
                />
                <Route 
                    path='support'
                    element={<Support/>}
                />
                <Route
                    path='QrCard'
                    element={
                        <div className="fullscreen-user-card">
                            <button onClick={handleClose} className="close-button">X</button>
                            <QrCard user={userCardProps} />
                        </div>
                    }
                />
            </Routes>
        </>
    );
}
