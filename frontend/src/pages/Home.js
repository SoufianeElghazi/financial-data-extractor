import React from 'react';
import ExchangeRates from '../components/ExchangeRate';
import Contact from '../components/Contact';
import homeLogo from '../assets/home-main.svg';
import scan from '../assets/scan.svg';
import companyLogo1 from '../assets/company1.png'; 
import companyLogo2 from '../assets/company2.png'; 
import companyLogo3 from '../assets/company3.png'; 
import companyLogo4 from '../assets/company4.png'; 
import companyLogo5 from '../assets/company5.png'; 
import financialReportsImage from '../assets/financial-reports.svg';


function Home() {
  return (
    <section>
      <div className="home-section relative z-0 bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto py-12">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full mb-1 md:w-5/12 flex justify-center">
              <img
                src={homeLogo}
                alt="home pic"
                className="max-h-52"
              />
            </div>
            <div className="w-full mt-1 md:w-7/12 px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Welcome to 
                <strong className="text-teal-600"> Finance Reports Extractor</strong>
              </h1>
              <div className="mt-4 text-left">
                <ExchangeRates />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-7/12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center">Financial Reports</h2>
            <p className="text-lg text-white mb-4">
              We work with various financial reports, including Bilan Passif, Bilan Actif, and CPC. These reports are essential for understanding the financial health and performance of a company.
            </p>
            <p className="text-lg text-white mb-4">
              The Bilan Passif provides insights into the liabilities and equity of a company, while the Bilan Actif details the company's assets. The CPC (Compte de Produits et Charges) summarizes the company's revenues and expenses over a specific period.
            </p>
            <div className="text-center py-12">
              <a
                href="https://www.ammc.ma/fr/liste-etats-financiers-emetteurs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-950 transition duration-300"
              >
                Know More ...
              </a>
            </div>
          </div>
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={financialReportsImage}
              alt="Financial Reports"
              className="max-h-72"
            />
          </div>
        </div>
        
        <hr className="section-divider mb-8" />
        <div className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center">Financial Reports from Companies like</h2>
          <div className="overflow-hidden">
            <div className="flex justify-around items-center animate-scroll">
              <img src={companyLogo1} alt="Company 1" className="h-20 mx-4" />
              <img src={companyLogo2} alt="Company 2" className="h-20 mx-4" />
              <img src={companyLogo3} alt="Company 3" className="h-20 mx-4" />
              <img src={companyLogo4} alt="Company 4" className="h-20 mx-4" />
              <img src={companyLogo5} alt="Company 5" className="h-20 mx-4" />
            </div>
          </div>
        </div>

        <hr className="section-divider mb-8" />
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={scan}
              alt="Scan"
              className="max-h-64"
            />
          </div>
          <div className="w-full md:w-7/12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center"><span className="text-white">What is </span> Finance Report Extractor?</h2>
            <p className="text-lg text-white mb-4">
              Finance Reports Extractor is a tool i developped using various advanced tools like image processing and OCR that takes Financial
              reports and extract the data we want from it .
            </p>
          </div> 
        </div>


        <Contact />
      </div>
    </section>
  );
}

export default Home;
