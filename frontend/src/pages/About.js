import React from 'react';
import Contact from '../components/Contact';
import step2 from '../assets/step2.svg';
import step1 from '../assets/step1.svg';
import step3 from '../assets/step3.svg';
import step4 from '../assets/step4.svg';


function About() {
  return (
    <section>
      <div className="about-section relative z-0 bg-cover bg-center bg-no-repeat">
        <div className="py-12">
          <div className="flex justify-center">
            <div className="w-full md:w-7/12 px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Guide:
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-teal-300 mb-8">
                How Does The Model Works
              </h2>
            </div>
          </div>
        </div>
    </div>



      <div className="container mx-auto py-12">
         {/* Step1 */}
         <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-7/12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center">Step 1 :</h2>
            <p className="text-lg text-white mb-4">
              The Model takes the provided PDF and convert it into image then find table in that image.
            </p>
          </div>
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={step1}
              alt="Step 1"
              className="max-h-44"
            />
          </div>
        </div>
        <br/><br/><hr className="smallsection-divider mb-8" />

        {/* Step2 */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={step2}
              alt="Step 2"
              className="max-h-44"
            />
          </div>
          <div className="w-full md:w-7/12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center">Step 2 :</h2>
            <p className="text-lg text-white mb-4">
             Conduct OCR processing to make the text selectable using a well known model to extract data from the croped table image.
            </p>
          </div>
        </div>
        <br/><br/><hr className="smallsection-divider mb-8" />
        {/* Step3 */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-7/12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center">Step 3 :</h2>
            <p className="text-lg text-white mb-4">
              Extract the desired data using regular expressions regex to capture relevent patterns withing the extracted data.
            </p>
          </div>
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={step3}
              alt="Step 3"
              className="max-h-44"
            />
          </div>
        </div>
        <br/><br/><hr className="smallsection-divider mb-8" />

        {/* Step4 */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={step4}
              alt="Step 4"
              className="max-h-44"
            />
          </div>
          <div className="w-full md:w-7/12 px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-300 mb-4 text-center">Step 4 :</h2>
            <p className="text-lg text-white mb-4">
              Then pass the extracted data to the front to display it .
            </p>
          </div>
        </div>
        <br/>
        <Contact />
      </div>
    </section>
  );
}

export default About;
