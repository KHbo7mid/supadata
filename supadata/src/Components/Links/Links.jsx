import { motion } from "framer-motion"
import { useState } from "react";


export default function Links() {
  const links = [
    { label: "Home", url: "#hero" },
    { label: "Benifits", url: "#benefits" },
    { label: "Businesses & Teams", url: "#businesses-teams" },
    { label: "Solutions", url: "#solutions" },
    { label: "Contact", url: "#contact" }
];

const [activeLink, setActiveLink] = useState('#hero'); 

const handleLinkClick = (url) => {
  setActiveLink(url);
};
  return (
    <ul className="navbar-nav ms-auto mt-2" >
      {links.map((link ,index)=>{
        return ( <li className="nav-item fw-bold " key={index}><motion.a href={link.url} className={`nav-link ${activeLink === link.url ? 'active' : ''}`} whileHover={{scale:1.05,color:'red'}} whileTap={{scale:0.95}}
          onClick={() => handleLinkClick(link.url)}
            style={{ color: activeLink === link.url ? 'red' : 'inherit' }}
          >{link.label}</motion.a></li>)
      })}
    </ul>
  )
}
