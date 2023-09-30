import {useEffect, useRef, useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import './css/navbar.css';
import { Link } from 'react-scroll';
import ReactDOM from 'react-dom';
import React  from 'react';
import MainLogo from './images/MainLogo.jpg';



function Navbar(){
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  const [navbar, setNavbar] = useState(false);


const changebackground = () => {
  if(window.scrollY >= 80){
    setNavbar(true);
  }else{
    setNavbar(false);
  }
}

window.addEventListener('scroll', changebackground);

  return(
    <header className={navbar ? 'navheader active' : 'navheader'}>
      
      <img src={MainLogo} alt={"Logo"}/>
      
      <h1>Home Design</h1><h3></h3>
      
      <nav ref={navRef}>
      <ul>  
                    <Link activeClass="active" 
                            to="Portfolio"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}
                            onClick={showNavbar}>
                      <li>Portfolio</li>
                      </Link>
                    <Link activeClass="active" 
                            to="Info"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}
                            onClick={showNavbar}>
                      <li>Info</li>
                      </Link>
                      <Link activeClass="active" 
                            to="Oferta"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}
                            onClick={showNavbar}>
                      <li>Oferta</li>
                      </Link>
                      <Link activeClass="active" 
                            to="Summary"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}
                            onClick={showNavbar}>
                      <li>Współpraca</li>
                      </Link>
                      <Link activeClass="active" 
                            to="Kontakt"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}
                            onClick={showNavbar}>
                      <li>Kontakt</li>
                      </Link>
                  </ul>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes/>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
          <FaBars/>
      </button>
      
    </header>
    
  );
}

export default Navbar;