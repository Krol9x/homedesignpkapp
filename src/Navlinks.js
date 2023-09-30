import { Link } from 'react-scroll';
import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';

const NavLinks = () => {
    return (
      
                  <ul>
                    <Link activeClass="active" 
                            to="Info"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}>
                      <li>Info</li>
                      </Link>
                      <Link activeClass="active" 
                            to="Portfolio"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}>
                      <li>Portfolio</li>
                      </Link>
                      <Link activeClass="active" 
                            to="Oferta"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}>
                      <li>Oferta</li>
                      </Link>
                      <Link activeClass="active" 
                            to="Kontakt"
                            spy={true}
                            smooth={true}
                            offset={-79}
                            duration={500}>
                      <li>Kontakt</li>
                      </Link>
                  </ul>
    )
}

export default NavLinks;