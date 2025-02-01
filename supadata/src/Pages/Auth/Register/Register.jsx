import { useEffect, useRef, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Grid, Button ,Typography} from '@mui/material';
import PersonalInfo from './Steps/PersonalInfo';
import Social from './Steps/Social/Social';
import Messaging from './Steps/Messaging';
import Business from './Steps/Business';
import CustomCard from './Card/CustomCard';
import { useNavigate, useParams } from 'react-router-dom';
import {useAuth} from '../../../Context/AuthContext';
import axiosInstance from '../../../Api/Axios';
import Finish from './Team/Finish';

const steps = ["Personal Info", "Social", "Messaging", "Business","Finish"];

export default function Register() {
    const urlStorage = 'http://127.0.0.1:8000/storage';   
    const navigate = useNavigate();
    const { setUser, csrfToken } = useAuth();
    const { userId } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        role: 'particulier',
        socialLinks: [],
    });
    useEffect(() => {
        if (userId) {
            // Fetch user data if userId exists (editing mode)
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token'); 

                    const response = await axiosInstance.get(`/user/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}` 
                    }
                    });
                    const fetchedData = {
                        ...response.data,
                        socialLinks: Array.isArray(response.data.socialLinks) ? response.data.socialLinks : [],
                    };
                    
                    setFormData(fetchedData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchData();
        }
    }, [userId]);

    const formRefs = useRef([]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'personalInfo') {
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
        let updatedSocialLinks = formData.socialLinks;
    
        if (activeStep === steps.length - 1) { 
            
            handleSubmit({
                ...formData,
                socialLinks: updatedSocialLinks
            });
        } else {
            if (activeStep === 1 || activeStep === 2 || activeStep===3) { // Social or Messaging steps
                updatedSocialLinks = [
                    ...formData.socialLinks,
                    ...Object.entries(values).map(([name, url]) => ({ name, url_link: url }))
                ];
                setFormData(prevData => ({
                    ...prevData,
                   
                    socialLinks: updatedSocialLinks
                }));
            } else {
                // Personal Info or other steps
                setFormData(prevData => ({
                    ...prevData,
                    ...values
                }));
            }
            setActiveStep(prevStep => prevStep + 1); // Move to the next step
        }
    };
    
    
    

    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async (dataToSubmit) => {
        await csrfToken(); 
    
        
        const data = new FormData();
        
       
        for (const [key, value] of Object.entries(dataToSubmit))
             {  if (value !== null && value !== undefined) {
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
        console.log(dataToSubmit);

        try {
            let response ;
            if(userId)
            {
                const token = localStorage.getItem('token'); 
                 response=await axiosInstance.put(`/user/${userId}`,data,{
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
            }else{
                 response = await axiosInstance.post('/register', data, {
                    headers: {
                        'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN'),
                    },
                });
            }
           

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
            case 0: return <PersonalInfo ref={el => formRefs.current[0] = el} onNext={handleNext} formData={formData}  handleInputChange={handleInputChange} urlStorage={urlStorage}/>;
            case 1: return <Social ref={el => formRefs.current[1] = el} onNext={handleNext} formData={formData} />;
            case 2: return <Messaging ref={el => formRefs.current[2] = el} onNext={handleNext} formData={formData} />;
            case 3: return <Business ref={el => formRefs.current[3] = el} onNext={handleNext} formData={formData} />;
            case 4: return <Finish ref={el => formRefs.current[4] = el} onNext={handleNext} formData={formData} />;

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
                cover_photo={!formData.cover_photo ? null:formData.cover_photo instanceof File ? URL.createObjectURL(formData.cover_photo):`${urlStorage}/${formData.cover_photo}` }
                profile_picture={!formData.profile_picture ? null:formData.profile_picture instanceof File ? URL.createObjectURL(formData.profile_picture):`${urlStorage}/${formData.profile_picture}`}
                name={formData.name}
          email={formData.email}
          job_title={formData.job_title}
          phone={formData.phone}
          address={formData.address}
          color={formData.color}
          police={formData.police}
          company_logo={!formData.company_logo ? null:formData.company_logo instanceof File ? URL.createObjectURL(formData.company_logo):`${urlStorage}/${formData.company_logo}`}
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
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
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
    );
}
