import React from 'react';
import errorImg from '../../images/404.png';
import './error.css';

const Error = () => (
  <div className="wrap">
    <div className="logo">
      <p>
404 - That’s an error.
      </p>
      <img src={errorImg} alt="404" />
      <div className="sub">
        <p>
          <a href="/">
            {' '}
Back
            {' '}
          </a>
        </p>
      </div>
    </div>
  </div>
);
export default Error;
