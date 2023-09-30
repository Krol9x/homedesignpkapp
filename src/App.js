
import logo1 from './images/facebook.svg';
import logo2 from './images/instagram.svg';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ImageSlider from "./ImageSlider";
import Gallery from "./Gallery";
import emailjs from "emailjs-com";
import Contact from "./Contact";
import NavLinks from './Navlinks';
import Navbar from './Navbar';
import Home from './home';
import Login from './login';

import { Link } from 'react-scroll';
import OfferSlider from './OfferSlider';
import OfferSlider2 from './OfferSlider2';
import OfferSlider3 from './OfferSlider3';
import About from './About'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typical from 'react-typical';
import { SignInMethod } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
import ImageGrid from './ImageGrid';
import Summary from './Summary';
import Modal from './Modal';
import ClipLoader from "react-spinners/ClipLoader";
import UserProfileDisplay from './UserDisplay';

// Import images from the "images" folder
import slide1 from './images/slide1.jpg';
import slide2 from './images/slide2.jpg';
import slide3 from './images/slide3.jpg';
import slide4 from './images/slide4.jpg';

const App = () => {
  const [loading, setloading] = useState(false);
  const [showParagraph1, setShowParagraph1] = useState(false);
  const [showParagraph2, setShowParagraph2] = useState(false);
  const [showParagraph3, setShowParagraph3] = useState(false);

  const slides = [
    { url: slide1, title: 'slide 1' },
    { url: slide2, title: 'slide 2' },
    { url: slide3, title: 'slide 3' },
    { url: slide4, title: 'slide 4' }
  ];
    window.addEventListener("load", function () {
      var loader = document.querySelector(".preloader");
      var banner = document.querySelector(".Banner");
    
      loader.style.display = "none";
      loader.style.animation = "none";
      banner.style.animation = "1s ease-out 0s 1 slideInFromLeft";
    });
    const containerStyles = {
        width: "100%",
        height: "100vh",
        margin: "0 auto",
    };

    const handleClick1 = () => {
      setShowParagraph1(!showParagraph1);
    };

    const handleClick2 = () => {
      setShowParagraph2(!showParagraph2);
    };

    const handleClick3 = () => {
      setShowParagraph3(!showParagraph3);
    };
  

  const portfolioRef = useRef(null); // Reference to the portfolio section
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);

  const checkPortfolioVisibility = () => {
    if (portfolioRef.current) {
      const top = portfolioRef.current.getBoundingClientRect().top;
      setIsPortfolioVisible(top < window.innerHeight);
    }
  };

  useEffect(() => {
    checkPortfolioVisibility(); // Check visibility on initial load

    const handleScroll = () => {
      checkPortfolioVisibility();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    
    AOS.init({
      duration: 1000, // Set your preferred duration
      easing: 'ease-out', // Set your preferred easing function
      offset: 1, // Set the offset value
    });
    
  }, [])

  const [selectedImg, setSelectedImg ] = useState(null)

  const scrollToTop = () => {
    const duration = 500; // Set the duration in milliseconds
    const start = window.scrollY || window.pageYOffset;
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1);

      window.scrollTo(0, start * (1 - progress));

      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  };
  return (

    <div className="App">
          <div className="preloader"></div>
          <header className="App-header">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home/>}/>
                </Routes>

                <Navbar />

              <div className = "logoimage">
                    <a href="https://www.facebook.com/people/Home-Design-by-Paulina-Kurzawa/100083004109172/?hc_ref=ARQfNA-rN96aNtttSK3IqDNHSr-VhY3ANdm3Qa4GmbTYnlxSU8IViax-QPbQEUe3mXE&fref=nf&__xts__[0]=68.ARBj6hfS44ImkhzlxGdqECDrFi1enSLwQbxab-L40LW2wLsn_M67PfaCiPQhjjjwAoZPsd3uHGSeb_zI2yhW_eCWnQJCz7m7A9FbRRoh3yvUvd6yZJsxpNQJLd98fGZmUmQ8tIlgS2oQ1XPP_DC_obbmEqwxN2eoymnAEH6mGeW5d_oMh8E2QmlKt6x9l1ZcCesbfcJz2NciMYRYLEvrFqM0J_e9OqkfnkMqdwlaf8r_5QVOv63bWqbzuad2BwAazgFoziPiGCGMtAPaagEDwLDDRGtx6peZvZ_5tIqs4YAEhN_e310"><img src={logo1} alt={"facebook"}/></a>
                    <a href="https://www.instagram.com/brymm_/"><img src={logo2} alt={"instagram"}/></a>
                    
              </div>

              <div className="Banner">
                  <div style={containerStyles}>
                      <ImageSlider slides={slides} parentWidth={100} />
                  </div>
                  <div className="introduction"><h4>Aranżacja Wnętrz</h4>
                  </div>


              </div>

              <div className="Portfolio">
                
                <h1>Portfolio</h1>
              <div className = "LinkPortfolio" >
              </div>
                
                <ImageGrid setSelectedImg={setSelectedImg} />
                { selectedImg && <Modal selectedImg={selectedImg} />}
                
            </div>

              <div className="Info" data-aos="slide-left" data-aos-duration="20">
                
              <h1>Kim Jestesmy</h1>
                <div className = "LinkInfo" >


                <UserProfileDisplay />
                </div> 
              </div>
    
              

              <div className="Oferta" data-aos="slide-left" data-aos-duration="20">
        <h1>Oferta</h1>
        <div className="LinkOferta">
          <br />
          <OfferSlider />
          <div className="Offer">


              
         
          </div>
          <OfferSlider2 />
          <div className="Offer">
            
             

              
          
          </div>
          <OfferSlider3 />
          <div className="Offer" >

              

            
          </div>
        </div>
      </div>
              
              <div className="Summary" data-aos="slide-left" data-aos-duration="20">
                <div className = "LinkSummary">
                <h1>Współpraca Krok Po Kroku</h1>
                </div>
                <Summary />
              </div>

              <div className="Kontakt" data-aos="slide-left" data-aos-duration="20">
                <div className = "LinkKontakt">
                <h1>Kontakt</h1>
                </div>
                <Contact />
              </div>
              <br />
              <br />
              <div className="Footer">
              <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <h1>⥣</h1>
        </a>
              <div className='links'>
              


              </div>
              </div>
              
              <br></br>


      </header>
      
    </div>
    
  );
}



export default App;
