import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Register.css'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import CustomInput from '../CustomInput/CustomInput';
import InputImage from '../InputImage';

const validatePhoneNumber = (phone) => {
  if(!phone) return false;
  const phoneWithoutCountryCode = phone.replace(/^\+\d{1,4}/, '').trim();
  return phoneWithoutCountryCode.length > 0;
};
const validationSchema = Yup.object({
  
  address: Yup.string().required('Address is required'),
  phone: Yup.string().test('valid-phone', 'Phone number is Invalid', validatePhoneNumber),
  
  cover_photo: Yup.mixed().required('Cover photo is required'),
  company_logo:Yup.mixed().required('Company Logo is required'),
  company_name:Yup.mixed().required('Company name is required'),
  url_company:Yup.mixed().required('Company URL is required'),
  color: Yup.string().matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').required('Color is required'),
});
const  Company_Info=forwardRef((props,ref) =>{
  const [companyLogoPreview, setCompanyLogoPreview] = useState(props.formData.company_logo ? URL.createObjectURL(props.formData.company_logo) : null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(props.formData.cover_photo ? URL.createObjectURL(props.formData.cover_photo) : null);
  const formik=useFormik({
    initialValues:{
      company_name:props.formData.company_name||'',
      
      url_company: props.formData.url_company || '',
      address: props.formData.address || '',
      phone: props.formData.phone || '',
      cover_photo: props.formData.cover_photo || null,
      company_logo: props.formData.company_logo || null,
      color: props.formData.color || '#000000',
      police:props.formData.police || "'Arial', sans-serif",
    },
    validationSchema,
      onSubmit:(values)=>{
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
  const handleFileChange = (event, name, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        formik.setFieldValue(name, file); 
      } else {
        formik.setFieldError(name, 'Please select a valid image file.');
      }
    }
  };
  const clearField = (name) => {
    formik.setFieldValue(name, null);
    props.handleInputChange({
      target: {
        name: 'Company_Info',
        value: { ...formik.values, [name]: null }
      }
    });
  };
  useEffect(() => {
    props.handleInputChange({
      target: {
        name: 'Company_Info',
        value: formik.values
      }
    });
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
       
      <InputImage
          id="companyLogoInput"
          name="company_logo"
          handleFileChange={(e) => handleFileChange(e, 'company_logo', setCompanyLogoPreview)}
          setPreview={setCompanyLogoPreview}
          Preview={companyLogoPreview}
          label="Company Logo"
          clearField={clearField}

          error={formik.errors.company_logo && formik.touched.company_logo ? formik.errors.company_logo : undefined}
        />
        <InputImage
          id="coverPhotoInput"
          name="cover_photo"
          handleFileChange={(e) => handleFileChange(e, 'cover_photo', setCoverPhotoPreview)}
          setPreview={coverPhotoPreview}
          Preview={coverPhotoPreview}
          label="Cover Photo"
          clearField={clearField}

          error={formik.errors.cover_photo && formik.touched.cover_photo ? formik.errors.cover_photo : undefined}
        />
      </div>
      <div className="row">
        <CustomInput
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formik.values.company_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         

          error={formik.errors.company_name && formik.touched.company_name ? formik.errors.company_name : undefined}
        />
       
        <CustomInput
          type="text"
          name="url_company"
          placeholder="Company URL"
          value={formik.values.url_company}

          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          afficherURL={true}
          error={formik.errors.url_company && formik.touched.url_company ? formik.errors.url_company : undefined}

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
        <div className="col-md-12">
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
Company_Info.displayName='Company_Info';
export default Company_Info;

