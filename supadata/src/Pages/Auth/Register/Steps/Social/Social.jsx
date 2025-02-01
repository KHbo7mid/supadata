import { forwardRef,useEffect,useImperativeHandle } from 'react';
import { useFormik } from 'formik';
import SocialMedia from './SocialMedia';



const Social = forwardRef((props, ref) => {
  const formik = useFormik({
    initialValues: {
      facebook: props.formData?.facebook || '',
      x: props.formData?.x || '',
      instagram: props.formData?.instagram || '',
      linkedin: props.formData?.linkedin || '',
      youtube: props.formData?.youtube || '',
      snapchat: props.formData?.snapchat || '',
      tiktok: props.formData?.tiktok || '',
      twitch: props.formData?.twitch || '',
      yelp: props.formData?.yelp || '',
    },
    
    onSubmit: (values) => {
      props.onNext(values);
    },
  });

  useImperativeHandle(ref, () => ({
    validateForm: formik.validateForm,
    setFieldValue: formik.setFieldValue,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
    setErrors: formik.setErrors,
    values: formik.values,
  }));
  useEffect(() => {
    const formDataValues = {
      facebook: props.formData?.facebook || '',
      x: props.formData?.x || '',
      instagram: props.formData?.instagram || '',
      linkedin: props.formData?.linkedin || '',
      youtube: props.formData?.youtube || '',
      snapchat: props.formData?.snapchat || '',
      tiktok: props.formData?.tiktok || '',
      twitch: props.formData?.twitch || '',
      yelp: props.formData?.yelp || '',
    };
  
    formik.setValues(formDataValues);
  }, [props.formData]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row" ref={ref}>
        <SocialMedia
          id="facebook"
          name="facebook"
          placeholder="Facebook Link"
          icon="bi bi-facebook"
          afficheURL={true}
          value={formik.values.facebook }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="x"
          name="x"
          placeholder="X Link"
          icon="bi bi-twitter-x"
          afficheURL={true}
          value={formik.values.x }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="instagram"
          name="instagram"
          placeholder="Instagram Link"
          icon="bi bi-instagram"
          afficheURL={true}
          value={formik.values.instagram }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="linkedin"
          name="linkedin"
          placeholder="Linkedin Link"
          icon="bi bi-linkedin"
          afficheURL={true}
          value={formik.values.linkedin }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="youtube"
          name="youtube"
          placeholder="Youtube Link"
          icon="bi bi-youtube"
          afficheURL={true}
          value={formik.values.youtube }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="snapchat"
          name="snapchat"
          placeholder="Snapchat Link"
          icon="bi bi-snapchat"
          afficheURL={true}
          value={formik.values.snapchat }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="tiktok"
          name="tiktok"
          placeholder="Tiktok Link"
          icon="bi bi-tiktok"
          afficheURL={true}
          value={formik.values.tiktok }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="twitch"
          name="twitch"
          placeholder="Twitch Link"
          icon="bi bi-twitch"
          afficheURL={true}
          value={formik.values.twitch }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <SocialMedia
          id="yelp"
          name="yelp"
          placeholder="Yelp Link"
          icon="bi bi-yelp"
          afficheURL={true}
          value={formik.values.yelp }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
    </form>
  );
});

Social.displayName = 'Social';

export default Social;
