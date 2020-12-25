import React from "react"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="site-footer">
      <h4 className="text-center">Code Blog</h4>
      <p className="text-center">Follow us on social media</p>
      <div className="footer-social-links">
        <ul className="social-links-list">
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              className="instagram"
            >
              <FaInstagram size={33} />
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" className="facebook">
              <FaFacebookF size={33} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" className="twitter">
              <FaTwitter size={33} />
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" className="linkedin">
              <FaLinkedinIn size={33} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
