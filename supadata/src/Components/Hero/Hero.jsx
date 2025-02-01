import './hero.css';
import Button from '../Button/Button';
import hero from '../../assets/images/image1.png';
import scroll from '../../assets/images/scroll.png';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CardTypeDialog from '../CardTypeDialog/CardTypeDialog';
export default function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const scrollVariants={
   scrollButton:{
    opacity:0,
    y:10,
    transition:{
      duration:1.5,
      repeat:Infinity,
    }

   }
  }
  const textVariants={
    initial:{
      x:-500,
      opacity:0,
    },
    animate:{
      x:0,
      opacity:1,
      transition: {
        duration:1,
        staggerChildren:0.1,
      }
    }
  }
  const textVariants_img={
    initial:{
      x:500,
      opacity:0,
    },
    animate:{
      x:0,
      opacity:1,
      transition: {
        duration:1,
        staggerChildren:0.1,
      }
    }
  }
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <motion.div className="col-lg-6 align-self-center" variants={textVariants}  initial="initial" animate="animate">
              <motion.div className="left-content header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s" variants={textVariants}
             >
                <motion.h6 variants={textVariants}>Welcome to </motion.h6>
                <motion.h2 variants={textVariants}> <em>SupaData</em>   </motion.h2>
                <motion.h3 variants={textVariants}><span style={{color:'purple'}}>The Smart</span> Business Card</motion.h3>
                <motion.p variants={textVariants}>Link and share your contact details.Connect and Expand your Network</motion.p>
               
              </motion.div>
             <motion.div className="button-container" variants={textVariants} >
             <Button onClick={handleOpenDialog} title={"Create Your Card"}/>    
                     <Link to={'/team'}><Button  title={"For Teams"}  /></Link>
             </motion.div>
            </motion.div>
            <div className="col-lg-6">
              <motion.div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s" variants={textVariants_img} animate='animate' initial="initial">
                <motion.img src={hero} alt="hero"/>
              </motion.div>
            </div>
            <motion.div className='imageContainer col-lg-6 align-self-center' variants={scrollVariants} animate="scrollButton">
     <motion.a href="#benifits"><motion.img src={scroll} alt="scroll"  /></motion.a >
     </motion.div>
            
          </div>
        </div>
        
      </div>
      
     
    </div>
    <CardTypeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />

  </div>

  );
}
