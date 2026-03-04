import { MdDeviceHub } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { SOCIAL_MEDIA_SITES } from '@/constants.js';

/**
 * Footer component:
 * - Displays brand logo and copyright information.
 * - Renders dynamic social media links from configuration.
 * - Implements accessibility best practices (aria-labels) and security (rel attributes).
 */
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
          {/* Dynamic mapping of social media links for better scalability */}
          {SOCIAL_MEDIA_SITES.map(({ icon: Icon, address, label }) => (
            <a
              key={address}
              href={address}
              target="_blank"
              rel="noopener noreferrer" // Security best practice for external links
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
