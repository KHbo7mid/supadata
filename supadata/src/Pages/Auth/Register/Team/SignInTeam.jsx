import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../CustomInput/CustomInput';
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
   
  });
const SignInTeam =forwardRef((props,ref)=>{
const formik=useFormik({
    initialValues:{
        email: props.formData.email || '',
        password: props.formData.password || '',  
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
  useEffect(() => {
    props.handleInputChange({
      target: {
        name: 'SignInTeam',
        value: formik.values
      }
    });
  }, [formik.values]);
  return (
<form onSubmit={formik.handleSubmit}>
<div className="container ">
  <div className="row">
    <div className="col-md-6">
      <CustomInput
        type="email"
        name="email"
        placeholder="Email (*)"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.email && formik.touched.email ? formik.errors.email : undefined}
      />
    </div>
    <div className="col-md-6">
      <CustomInput
        type="password"
        name="password"
        placeholder="Password (*)"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.password && formik.touched.password ? formik.errors.password : undefined}
      />
    </div>
  </div>
</div>

</form>
  );
});
SignInTeam.displayName="SignInTeam";
export default SignInTeam;