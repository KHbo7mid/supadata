import { useFormik } from 'formik';
import  {useImperativeHandle, forwardRef, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

import SocialMedia from './Social/SocialMedia';


const Business = forwardRef((props, ref) => {
  const formik = useFormik({
    initialValues: {
      github: props.formData.github||'',
      gitlab: props.formData.gitlab||'',
    },
    onSubmit: (values) => {
     
    
    props.onNext(values);
    },
  });
  useImperativeHandle(ref, () => ({
    handleSubmit: formik.handleSubmit,
    setErrors: formik.setErrors,
    values: formik.values,
  }));
  useEffect(()=>{
    const formDataValues=({
      github: props.formData.github||'',
      gitlab: props.formData.gitlab||'',
    });
    if (JSON.stringify(formik.values) !== JSON.stringify(formDataValues)) {
      formik.setValues(formDataValues);
    }
  },[props.formData,formik.setValues]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row" ref={ref}>
        <SocialMedia
          id="github"
          name="github"
          placeholder="Github Link"
          icon="bi bi-github"
          afficheURL={true}
          value={formik.values.github || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="gitlab"
          name="gitlab"
          placeholder="Gitlab Link"
          icon="bi bi-gitlab"
          afficheURL={true}
          value={formik.values.gitlab || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      
    </form>
  );
});
Business.displayName="Business";
export default Business;
