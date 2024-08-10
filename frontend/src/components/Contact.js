import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiIndeed, SiMicrosoftoutlook,SiFiverr ,SiUpwork ,SiFreelancer } from 'react-icons/si';


const Contact = () => {
  return (
    <div className="py-12">
          <hr className="section-divider mb-8" />
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              FIND <span className="text-teal-600">ME ON</span>
            </h1>
            <p className="text-lg text-white mb-8">
              Feel free to <span className="text-teal-600">connect </span>with me
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/SoufianeElghazi"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-teal-600 transition duration-300"
              >
                <AiFillGithub size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/soufiane-el-ghazi/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-teal-600 transition duration-300"
              >
                <FaLinkedinIn size={30} />
              </a>
              <a
                href="https://profile.indeed.com/p/soufianee-w9t904c"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-teal-600 transition duration-300"
              >
                <SiIndeed size={30} />
              </a>
              <a
                href="mailto:soufiane.el-ghazi@esi.ac.ma"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-teal-600 transition duration-300"
              >
                <SiMicrosoftoutlook size={30} />
              </a>
              <a
                href="https://fr.fiverr.com/el_soufiane"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-teal-600 transition duration-300"
              >
                <SiFiverr size={30} />
              </a>
              <a
                  href="https://www.upwork.com/freelancers/~0100d2ba5e7b412fa5?mp_source=share"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-teal-600 transition duration-300"
                  >
                  <SiUpwork size={30}  />
                  
                </a>
                <a
                  href="https://www.freelancer.ma/profil/83934-data-scientist-data-engineer-software-mobile-dev-enthousiaste"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-teal-600 transition duration-300"
                >
                  <SiFreelancer size={30} />
                </a>
            </div>
          </div>
        </div>
  );
};

export default Contact;
