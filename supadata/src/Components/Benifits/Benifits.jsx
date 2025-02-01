import Benifit_card from './Benifit_card';
import './Benifits.css';

export default function Benifits() {
  return (
  
    <div className="benifits_section" id="benefits">
    <div className="services">
       <div className="container">
          <div className="title" data-align="center">

             <h3><span>SUPADATA</span> IS YOUR DIGITAL IDENTITY</h3>

          </div>
          <div className="row">
       <Benifit_card  title='CONNECT' subtitle='Connect to sales, marketing, social and multimedia links at the touch of a button'/>
       <Benifit_card title='REAL-TIME' subtitle='Update content on SUPADATA in Real-Time' />
       <Benifit_card  title='ANALYTICS' subtitle='Receive great integrated analytics and reporting for your company, branch, department and individuals'/>
       <Benifit_card title='TRANSACT' subtitle='Use your SUPADATA to communicate products, prices, and promotions and do business from one place!' />

        
      
     </div>
    
          </div>
          </div>
     </div> 
     
  )
}
