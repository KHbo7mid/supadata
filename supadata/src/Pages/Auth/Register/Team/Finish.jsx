import { forwardRef,useImperativeHandle } from "react"

const Finish =forwardRef((props,ref)=> {
  useImperativeHandle(ref, () => ({
   handleSubmit:()=>{
    props.onNext({});
   }
  }));
  return (
    <div className="container text-center my-5">
    <h3 className="mb-4 ">You’re Almost Done!</h3>
    <p className="lead mb-4 fs-6">
    Review your details and click <strong>&quot;Finish&quot;</strong> to complete your registration
    </p>
  </div>
  )
});
Finish.displayName="Finish";
export default Finish;
