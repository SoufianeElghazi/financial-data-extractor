import React from 'react';

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="bg-teal-950 p-4 mt-4">
      <div className="container mx-auto text-center text-white">
        <p> © {year} <span className="mx-2">•</span> soufiane ELGHAZI <span className="mx-2">—</span> All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

