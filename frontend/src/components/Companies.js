import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanySelect = ({ company, setCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <select
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      className="w-64 p-2 border rounded"
    >
      <option value="">Select a company</option>
      {companies.map((companyName, index) => (
        <option key={index} value={companyName}>
          {companyName.replace('company_', 'Company ').toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default CompanySelect;
