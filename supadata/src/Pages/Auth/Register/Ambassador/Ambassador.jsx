import { Box, Stepper, Step, StepLabel, Grid, Button ,Typography} from '@mui/material';
import Messaging from '../Steps/Messaging';
import CustomCard from '../Card/CustomCard';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../../../Context/AuthContext';
import axiosInstance from '../../../../Api/Axios';
import Finish from '../Team/Finish';
import Ambassador_info from './Ambassador_info';
import { useRef, useState } from 'react';
const steps = ["Personal Info", "Messaging","Finish"];


export default function Ambassador() {
    const navigate = useNavigate();
    const { setUser, csrfToken } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        role: 'ambassador',
        job_title:'ambassador',
        country:{key:'',label:''},
        socialLinks: [],
    });
    const formRefs = useRef([]);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'Ambassador_info') {
          setFormData((prevData) => ({
              ...prevData,
              ...value,
          }));
      } else {
          setFormData((prevData) => ({
              ...prevData,
              [name]: value,
          }));
      }
  };
    const handleNext = async (values) => {
      let updatedSocialLinks = [...formData.socialLinks];

      if (activeStep === 1) {
          updatedSocialLinks = [
              ...updatedSocialLinks,
              ...Object.entries(values).map(([name, url]) => ({ name, url_link: url }))
          ];
          setFormData(prevData => ({
              ...prevData,
              socialLinks: updatedSocialLinks
          }));
      } else {
          setFormData(prevData => ({
              ...prevData,
              ...values
          }));
      }

      if (activeStep === steps.length - 1) {
          await handleSubmit(formData);
      } else {
          setActiveStep(prevStep => prevStep + 1);
      }
  };

    const handleBack = () => {
      setActiveStep(prevStep => prevStep - 1);
    };
    const handleSubmit = async (dataToSubmit) => {
        await csrfToken();
        const data = new FormData();
        
        if (dataToSubmit.country ) {
          data.append('country[key]', dataToSubmit.country.key);
          data.append('country[label]', dataToSubmit.country.label);
      }
        for (const [key, value] of Object.entries(dataToSubmit))
          {  if (value !== null && value !== undefined && key !== 'country') {
         if (Array.isArray(value)) {
             // Handle arrays
             value.forEach((item, index) => {
                 data.append(`socialLinks[${index}][name]`, item.name);
                 data.append(`socialLinks[${index}][url_link]`, item.url_link);
             });
         } else if (value instanceof File) {
             
                 data.append(key, value);
             
         } else {
             data.append(key, value);
         }
     }
     }
        try {
          const response = await axiosInstance.post('/register', data, {
            headers: {
              'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN'),
            },
          });
          console.log('Registration response:', response); // Log server response
          if (response.status === 200) {
            console.log('Registration successful');
            navigate('/login');
          }
        } catch (error) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
    
            console.error('Registration error:', error.response.data.message);
          } else {
            setErrorMessage('Error submitting form: ' + error.message);
    
            console.error('Error submitting form:', error.message);
          }
        }
      };
      const getFormComponent=(step)=>{
        switch(step){
          case 0:return <Ambassador_info ref={el => formRefs.current[0] = el} onNext={handleNext} formData={formData} handleInputChange={handleInputChange}/>
          case 1:return <Messaging ref={el => formRefs.current[1] = el} onNext={handleNext} formData={formData}/>
          case 2:return <Finish ref={el => formRefs.current[2] = el} onNext={handleNext} formData={formData}/>
          default: return null;

        }
      };
      const handleFormSubmit = () => {
        const formComponent = formRefs.current[activeStep];
        if (formComponent && typeof formComponent.handleSubmit === 'function') {
          formComponent.handleSubmit();
        }
      };
      return (
        <Grid container sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomCard
              cover_photo={formData.cover_photo ? URL.createObjectURL(formData.cover_photo) : null}
              profile_picture={formData.profile_picture ? URL.createObjectURL(formData.profile_picture) : null}
              name={formData.name} 
              job_title={formData.job_title}
              email={formData.email}
              country={formData.country}
              phone={formData.phone}
              address={formData.address}
              color={formData.color}
              police={formData.police}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ width: '100%', padding: 2 }}>
              <Stepper activeStep={activeStep} orientation="horizontal">
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Grid container>
                <Grid item xs={12} sx={{ padding: '20px' }}>
                {errorMessage && (
                            <Typography color="error" variant="h6" align="center" sx={{ mb: 2 }}>
                                {errorMessage}
                            </Typography>
                        )}
                  {getFormComponent(activeStep)}
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )
}
