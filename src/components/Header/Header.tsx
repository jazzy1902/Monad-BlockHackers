import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <h1 className="header__title">Solar Energy Portal</h1>
            <p className="header__subtitle">Powering the Future with Clean Energy</p>
          </div>
        </div>
      </div>
    </header>
  );
};