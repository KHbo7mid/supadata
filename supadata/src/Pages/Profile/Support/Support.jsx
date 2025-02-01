import './Support.css'
export default function Support() {
  return (
    <section id="contact">
	<div className="sectionheader">	<h1>Support</h1></div>
	<article>
<p>Let us know how we can assist you. We usually respond to emails within 3 hours.</p>		
			<label htmlFor="checkcontact" className="contactbutton"><div className="mail"></div></label><input id="checkcontact" type="checkbox"/>
	
			<form action="" method="post" className="contactform">
				
				<p className="input_wrapper"><input type="text" name="contact_sujet" value=""  id ="contact_sujet"/><label htmlFor="contact_sujet">SUBJECT</label></p>
				<p className="textarea_wrapper"><textarea name="contact_message" id="contact_message" placeholder='Message'></textarea></p>
				<p className="submit_wrapper"><input type="submit" value="ENVOYER"/></p>			
			</form>
	</article>
</section>
  )
}
