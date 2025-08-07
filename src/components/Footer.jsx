import { MdDeviceHub } from 'react-icons/md';
import { Link } from 'react-router-dom';
import React from 'react';
import { socialMediaSites } from '@/constans.js';

function Footer() {
  return (
    <footer className="border-element">
      <div className="container d-flex justify-content-between align-items-center h-100">
        <div>
          <Link to="/" className="text-decoration-none">
            <MdDeviceHub className="logo-down--resp text-primary me-2" />
            <span className="font-down--resp--resp fw-bold text-primary">
              HelpHub
            </span>
          </Link>
          <p className="font-down--resp text-primary m-0">
            © 2025 HelpHub LTD, All Rights Reserved
          </p>
        </div>
        <div className="d-flex gap-3">
          {/* Przypisanie wartości icon do zmiennej Icon */}
          {socialMediaSites.map(({ icon: Icon, address, label }) => (
            <a
              key={address}
              href={address}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon className="text-primary logo-down--resp" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
