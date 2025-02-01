import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Register.css'
import InputImage from '../InputImage';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CustomInput from '../CustomInput/CustomInput';

// Validate phone number
const validatePhoneNumber = (phone) => {
  if(!phone || typeof phone !== 'string') return false;
  const phoneWithoutCountryCode = phone.replace(/^\+\d{1,4}/, '').trim();
  return phoneWithoutCountryCode.length > 0;
};

// Validation schema for formik
const validationSchema = Yup.object({
  name: Yup.string().required('First & Surname is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  job_title:Yup.string().required('Job title is required '),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().test('valid-phone', 'Phone number is Invalid', validatePhoneNumber),
  profile_picture: Yup.mixed().required('Profile picture is required'),
  cover_photo: Yup.mixed().required('Cover photo is required'),
  color: Yup.string().matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').required('Color is required'),
});

const PersonalInfo = forwardRef((props, ref) => {
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    null
  );
  const [companyLogoPreview, setCompanyLogoPreview] = useState(
null  );
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(
null  );
  useEffect(() => {
    if((props.formData?.profile_picture) instanceof File)
      {
        setProfilePicturePreview(props.formData?.profile_picture ? URL.createObjectURL(props.formData?.profile_picture) : null);

      }else{
        setProfilePicturePreview(props.formData?.profile_picture  ?`${props.urlStorage}/${props.formData?.profile_picture}`: null);

      }
      if(props.formData?.company_logo instanceof File)
      {
      setCompanyLogoPreview(props.formData?.company_logo ? URL.createObjectURL(props.formData?.company_logo) : null);
        
      }else{
      setCompanyLogoPreview(props.formData?.company_logo?`${props.urlStorage}/${props.formData?.company_logo}`:null);

      }
      if(props.formData?.cover_photo instanceof File)
      {
      setCoverPhotoPreview(props.formData?.cover_photo ? URL.createObjectURL(props.formData?.cover_photo) : null);
        
      }else
      setCoverPhotoPreview(props.formData?.cover_photo ?`${props.urlStorage}/${props.formData?.cover_photo}`:null);
      
    
  }, [props.userId, props.urlStorage, props.formData]);

  const formik = useFormik({
    initialValues: {
      name: props.formData.name || '',
      email: props.formData.email || '',
      password: props.formData.password || '',
     job_title:props.formData.job_title || '',   
         department: props.formData.department || '',
      company_name: props.formData.company_name || '',
      url_company: props.formData.url_company || '',
      address: props.formData.address || '',
      phone: props.formData.phone || '',
      profile_picture: props.formData.profile_picture || null, 
      cover_photo: props.formData.cover_photo || null,
      company_logo: props.formData.company_logo || null,
      color: props.formData.color || '#000000',
      police: props.formData.police || "'Arial', sans-serif",
    },
    validationSchema,
    onSubmit: (values) => {
      props.onNext(values);
    },
  });

  useImperativeHandle(ref, () => ({
    validateForm: formik.validateForm,
    setFieldValue: formik.setFieldValue,
    values: formik.values,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
    setErrors: formik.setErrors,
  }));
  useEffect(()=>{
    const formDataValues={
      name: props.formData.name || '',
      email: props.formData.email || '',
      password: props.formData.password || '',
     job_title:props.formData.job_title || '',   
         department: props.formData.department || '',
      company_name: props.formData.company_name || '',
      url_company: props.formData.url_company || '',
      address: props.formData.address || '',
      phone: props.formData.phone || '',
      profile_picture: props.formData.profile_picture || null, 
      cover_photo: props.formData.cover_photo || null,
      company_logo: props.formData.company_logo || null,
      color: props.formData.color || '#000000',
      police: props.formData.police || "'Arial', sans-serif",
    };
    if (JSON.stringify(formik.values) !== JSON.stringify(formDataValues)) {
      formik.setValues(formDataValues);
    }
  },[props.formData,formik.setValues])

  const handleFileChange = (event, name, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        formik.setFieldValue(name, file);
        formik.setFieldTouched(name, true); 
      } else {
        formik.setFieldError(name, 'Please select a valid image file.');
      }
    }
    else {
      setPreview(null);
      formik.setFieldValue(name, null); 
    }
  };
  const clearField = (name) => {
    formik.setFieldValue(name, null);
    formik.setFieldTouched(name, false);
    switch (name) {
      case 'profile_picture':
        setProfilePicturePreview(null);
        break;
      case 'company_logo':
        setCompanyLogoPreview(null);
        break;
      case 'cover_photo':
        setCoverPhotoPreview(null);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    props.handleInputChange({
      target: {
        name: 'personalInfo',
        value: formik.values
      }
    });
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <InputImage
          id="profilePictureInput"
          name="profile_picture"
          handleFileChange={(e) => handleFileChange(e, 'profile_picture', setProfilePicturePreview)}
          setPreview={setProfilePicturePreview}
          Preview={profilePicturePreview}
          label="Profile Picture"
          clearField={clearField}
          error={formik.errors.profile_picture && formik.touched.profile_picture ? formik.errors.profile_picture : undefined}
        />

        <InputImage
          id="companyLogoInput"
          name="company_logo"
          handleFileChange={(e) => handleFileChange(e, 'company_logo', setCompanyLogoPreview)}
          setPreview={setCompanyLogoPreview}
          Preview={companyLogoPreview}
          label="Company Logo"
          clearField={clearField}
        />

        <InputImage
          id="coverPhotoInput"
          name="cover_photo"
          handleFileChange={(e) => handleFileChange(e, 'cover_photo', setCoverPhotoPreview)}
          setPreview={setCoverPhotoPreview}
          Preview={coverPhotoPreview}
          clearField={clearField}
          label="Cover Photo"
          error={formik.errors.cover_photo && formik.touched.cover_photo ? formik.errors.cover_photo : undefined}
        />
      </div>

      <div className="row">
        <CustomInput
          type="text"
          name="name"
          placeholder="First & Surname"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         

          error={formik.errors.name && formik.touched.name ? formik.errors.name : undefined}
        />

        <CustomInput
          type="email"
          name="email"
          placeholder="Email (*)"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          

          error={formik.errors.email && formik.touched.email ? formik.errors.email : undefined}
        />

        <CustomInput
          type="password"
          name="password"
          placeholder="Password (*)"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         

          error={formik.errors.password && formik.touched.password ? formik.errors.password : undefined}
        />

<CustomInput
          type="job_title"
          name="job_title"
          placeholder="Job title (*)"
          value={formik.values.job_title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         

          error={formik.errors.job_title && formik.touched.job_title ? formik.errors.job_title : undefined}
        />


        <CustomInput
          type="text"
          name="department"
          placeholder="Department"
          value={formik.values.department}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         

        />

        <CustomInput
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formik.values.company_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         
        />

        <CustomInput
          type="text"
          name="url_company"
          placeholder="Company URL"
          value={formik.values.url_company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          afficherURL={true}

        />

        <CustomInput
          type="text"
          name="address"
          placeholder="Address (*)"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         
          error={formik.errors.address && formik.touched.address ? formik.errors.address : undefined}
        />

        <div className="col-md-4">
          <div className="form-group">

            <PhoneInput
              defaultCountry="us"
              value={formik.values.phone}
              onChange={(phone) => (validatePhoneNumber(phone)? formik.setFieldValue('phone', phone):formik.setFieldValue('phone', '') )}
              onBlur={() => formik.setFieldTouched('phone', true)}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="labelCss">Color</label>
            <input
              type="color"
              name="color"
              className="form-control"
              value={formik.values.color || '#000000'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="labelCss">Police</label>
            <select
              className="form-control"
              name="police"
              value={formik.values.police}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="'Arial', sans-serif">Arial</option>
              <option value="'Helvetica', sans-serif">Helvetica</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Verdana', sans-serif">Verdana</option>
              <option value="'Georgia', serif">Georgia</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'Roboto Slab', serif">Roboto Slab</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
});
PersonalInfo.displayName = 'PersonalInfo';
export default PersonalInfo;
