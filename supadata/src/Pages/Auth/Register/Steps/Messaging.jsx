import { useFormik } from 'formik';
import  { useImperativeHandle,forwardRef, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

import SocialMedia from './Social/SocialMedia';



const Messaging = forwardRef((props, ref) => {
  const formik = useFormik({
    initialValues: {
      whatsApp: props.formData.whatsApp||'',
      telegram:  props.formData.telegram||'',
      skype:  props.formData.skype||'',
      discord:  props.formData.discord||'',
      signal:  props.formData.signal||'',
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
      whatsApp: props.formData.whatsApp||'',
      telegram:  props.formData.telegram||'',
      skype:  props.formData.skype||'',
      discord:  props.formData.discord||'',
      signal:  props.formData.signal||'',
    });
    if (JSON.stringify(formik.values) !== JSON.stringify(formDataValues)) {
      formik.setValues(formDataValues);
    }
  },[props.formData,formik.setValues]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row" ref={ref}>
        <SocialMedia
          id="whatsapp"
          name="whatsApp"
          placeholder="WhatsApp Number"
          icon="bi bi-whatsapp"
          afficheURL={false}
          value={formik.values.whatsApp || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="telegram"
          name="telegram"
          placeholder="Telegram Link"
          icon="bi bi-telegram"
          afficheURL={false}
          value={formik.values.telegram || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="skype"
          name="skype"
          placeholder="Skype Link"
          icon="bi bi-skype"
          afficheURL={false}
          value={formik.values.skype || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="discord"
          name="discord"
          placeholder="Discord Link"
          icon="bi bi-discord"
          afficheURL={false}
          value={formik.values.discord || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="signal"
          name="signal"
          placeholder="Signal Link"
          icon="bi bi-signal"
          afficheURL={false}
          value={formik.values.signal || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      
    </form>
  );
});
Messaging.displayName='Messaging';
export default Messaging;
