import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate} from 'react-router-dom';
import './css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const MAX_ATTEMPTS = 5;
  const COOLDOWN_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

  useEffect(() => {
    const lastAttemptTimestamp = localStorage.getItem('lastAttemptTimestamp');
    if (lastAttemptTimestamp) {
      const cooldownEndTimestamp = parseInt(lastAttemptTimestamp, 10) + COOLDOWN_TIME;
      const remainingCooldownTime = cooldownEndTimestamp - Date.now();
      if (remainingCooldownTime > 0) {
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, remainingCooldownTime);
      }
    }
  }, [setDisabled]);

  const onLogin = (e) => {
    e.preventDefault();
    if (attempts >= MAX_ATTEMPTS) {
      const lastAttemptTimestamp = Date.now().toString();
      localStorage.setItem('lastAttemptTimestamp', lastAttemptTimestamp);
      setDisabled(true);
      setTimeout(() => {
        setAttempts(0);
        setDisabled(false);
        localStorage.removeItem('lastAttemptTimestamp');
      }, COOLDOWN_TIME);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/home'); 
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setAttempts(attempts + 1);
      });
  };

  return (
    
    <div className="Login">
      
      <div className="Loginform">
      <h2>Login</h2>
      
        <form>
          <div>
          <h4>Email</h4>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <br/>
            <h4>Hasło</h4>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button onClick={onLogin} className="primary" disabled={disabled}>Login</button>
          </div>
          {disabled && <p>You have reached the maximum number of login attempts. Please try again later.</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;