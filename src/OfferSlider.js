
import './css/offerslider.css';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { dataDigitalBestSeller } from './data';


function OfferSlider() {
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true, 
    autoplaySpeed: 10000,
    infinite: true, 
    prevArrow: <div className="slick-prev"><p>{"⇋"}</p></div>, 
    nextArrow: <div className="slick-next"><p>{"⇌"}</p></div>,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
     
    }));
  };

  return (
    
    <div className="slick">
        <h4>Wariant 1</h4>


      <Slider {...settings}>
        {dataDigitalBestSeller.map((item) => (
          <div className="card">
            <div className="card-top">
              <img
                src={
                  defaultImage[item.title] === item.title
                    ? defaultImage.linkDefault
                    : item.linkImg
                }
                
                onError={handleErrorImage}
              />
              
            </div>

          </div>
          
        ))}
      </Slider>
      <div className="slick2">  
                <h2>układ funkcjonalny kilka przykładów</h2>

      </div>
    </div>
  );
}

export default OfferSlider