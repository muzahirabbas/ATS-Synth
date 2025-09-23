import React from 'react';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="w-full py-6">
        <div className="container mx-auto text-center text-secondary-text text-sm">
          <p>&copy; {currentYear} CV-Synth. All rights reserved.</p>
          <p>Built with ❤️ and AI.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
