import React, { useState } from 'react';
import { searchReport } from '../services/api';
import CompanySelect from '../components/Companies';

const Search = () => {
  const [company, setCompany] = useState('');
  const [year, setYear] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await searchReport({ company, year });
      setReport(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setReport(null);
      setError('The selected data isn\'t found');
    }
  };

  return (
    <div className="container mx-10 p-4 mt-36 mb-36 flex">
      <div className="max-w-96 md:w-1/2 text-white">
        <h1 className="text-white text-2xl font-bold">Search Financial Reports</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4 text-green-950">
            <label className="block mb-2 text-white">Company</label>
            <CompanySelect company={company} setCompany={setCompany} />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-64 p-2 border rounded text-green-950"
            >
              <option className='text-green-950' value="">Select a year</option>
              {[...Array(15)].map((_, i) => (
                <option key={i} value={2010 + i}>
                  {2010 + i}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-teal-800 text-white m-1 px-6 py-3 rounded-md shadow-md hover:bg-teal-950 transition duration-300">
            Search
          </button>
        </form>
      </div>

      <div className="w-full mx-0 md:w-1/2 bg-teal-950 p-4 rounded text-teal-950 ml-4">
      {error ? (
  <div className="text-red-600 mt-2">{error}</div>
    ) : report ? (
      <>
        <h2 className="text-white text-xl font-bold mb-4">Report for {company} in {year}</h2>
        <div className="bg-red-300 p-4 mb-4 rounded">
          <h3 className="font-bold">Bilan Actif</h3>
          <img src={report.bilan_actif} alt="Bilan Actif" />
        </div>
        <div className="bg-orange-300 p-4 mb-4 rounded">
          <h3 className="font-bold">Bilan Passif</h3>
          <img src={report.bilan_passif} alt="Bilan Passif" />
        </div>
        <div className="bg-amber-300 p-4 mb-4 rounded">
          <h3 className="font-bold">CPC</h3>
          <img src={report.cpc} alt="CPC" />
        </div>
      </>
    ) : (
      <div className="text-white">Please select a company and year to search for a report...</div>
    )}
      </div>
    </div>
  );
};

export default Search;
