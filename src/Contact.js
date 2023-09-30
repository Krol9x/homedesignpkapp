import emailjs from "emailjs-com";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ReCAPTCHA from "react-google-recaptcha";
import './css/contact.css';

window.addEventListener('load', () => {
  const $recaptcha = document.querySelector('#g-recaptcha-response');
  if ($recaptcha) {
    $recaptcha.setAttribute('required', 'required');
  }
});

export default function ContactUs() {
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_j8b6jtp', 'template_s6qenbd', e.target, 'wuYaiqyDXmNgkp-8i')
    .then((result) => {
      console.log(result.text);
      setIsMessageSent(true);
    }, (error) => {
      console.log(error.text);
    });
    e.target.reset()
  }

  function handleCheckboxChange() {
    setShowCaptcha(!showCaptcha);
  }

  const onChange = () => { }

  return (
    <div>
      <div className="container">
        <form onSubmit={sendEmail}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input type="text" className="form-control" placeholder="Imie" name="name" required />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input type="email" className="form-control" placeholder="Adres Email" name="email" required />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input type="tel" className="form-control" placeholder="Numer Telefonu" name="telephone" required />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <textarea className="form-control" id="" cols="30" rows="8" placeholder="Wiadomosc" name="mess"></textarea>
            </div>
            <div className="col-8 form-group mx-auto">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={handleCheckboxChange} />
                <p className="form-check-label ml-2" htmlFor="defaultCheck1">Nie jestem robotem</p>
                <br></br>
                <br></br>
              </div>
            </div>

            <div className="col-8 mx-auto">
              <div style={{ display: showCaptcha ? 'block' : 'none' }}>
                <ReCAPTCHA className="captcha" sitekey="6LfF40cjAAAAAOFnC5SwA_Gqhg2425xtaaYrHNuP" onChange={onChange} required />
                <br></br>
              </div>
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              
            <input type="submit" className="btn btn-info" value={isMessageSent ? "Wiadomość wysłana!" : "Wyślij"}></input>
            
            </div>
          </div>
        </form>
        <br></br>
      </div>
    </div>
  );
}