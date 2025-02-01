import image from '../../assets/images/benifits_image.png';

export default function Benifit_card({title,subtitle}) {
  return (
    <div className="col-lg-3 col-sm-6">
         
            <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.3s">
              <div className="hidden-content">
                <h4>{title}</h4>
                <p>{subtitle}</p>
              </div>
              <div className="showed-content">
                <img src={image} alt="image" />
              </div>
            </div>
         
        </div>
  )
}
