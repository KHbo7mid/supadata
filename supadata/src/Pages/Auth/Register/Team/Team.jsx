import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, Stepper, Step, StepLabel,Typography } from '@mui/material';
import CustomCard from "../Card/CustomCard";
import { useRef, useState } from "react";
import axiosInstance from '../../../../Api/Axios';
import Company_Info from './Company_Info';
import Finish from "./Finish";
import SignInTeam from "./SignInTeam";
import { useAuth } from '../../../../Context/AuthContext';

const steps = ['Company Info', "Sign In", "Finish"];

export default function Team() {
  const { setUser, csrfToken } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    role: 'entreprise',
  });
  const navigate = useNavigate();
  const formRefs = useRef([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Company_Info' || name === 'SignInTeam') {
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
    
    setFormData(prevData => ({
      ...prevData,
      ...values
    }));
  
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
    for (const [key, value] of Object.entries(dataToSubmit)) {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          data.append(key, value); // Handle file inputs separately
        } else {
          data.append(key, value);        }
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
  

  const getFormComponent = (step) => {
    switch (step) {
      case 0: return <Company_Info ref={el => formRefs.current[0] = el} onNext={handleNext} formData={formData}  handleInputChange={handleInputChange} />;
      case 1: return <SignInTeam ref={el => formRefs.current[1] = el} onNext={handleNext} formData={formData}  handleInputChange={handleInputChange} />;
      case 2: return <Finish ref={el => formRefs.current[2] = el} onNext={handleNext} formData={formData} />;
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
                  company_logo={formData.company_logo? URL.createObjectURL(formData.company_logo) : null}

          cover_photo={formData.cover_photo ? URL.createObjectURL(formData.cover_photo) : null}
          name={formData.company_name} 
          email={formData.email}
          url_company={formData.url_company}
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
