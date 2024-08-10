import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Preload from '../components/Preload';
import dollarIcon from '../assets/dollar.png';
import euroIcon from '../assets/euro.png';
import madIcon from '../assets/mad.png';

const CACHE_KEY = 'exchangeRates';
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

const fetchRatesFromAPI = async () => {
  const apiKey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
  const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
  const rates = response.data.conversion_rates;
  const timestamp = new Date().getTime();
  localStorage.setItem(CACHE_KEY, JSON.stringify({ rates, timestamp }));
  return rates;
};

const getCachedRates = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return null;
  const { rates, timestamp } = JSON.parse(cachedData);
  const now = new Date().getTime();
  if (now - timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  return rates;
};

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        let rates = getCachedRates();
        if (!rates) {
          rates = await fetchRatesFromAPI();
        }
        setRates(rates);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  if (loading) {
    return <Preload />;
  }

  if (error) {
    return <div className="text-red-600 bg-gray-300 border-green-950">Error: {error.message}</div>;
  }

  return (
    <div className="rounded-xl p-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6 max-w-4xl mx-auto bg-gradient-to-tr from-teal-800 to-teal-600 bg-clip-border text-white shadow-lg shadow-green-950/40 transform hover:scale-105 hover:shadow-lg hover:shadow-green-800 transition-all duration-300">
      <div className="flex items-center space-x-2">
        <img src={dollarIcon} alt="Dollar" className="w-8 h-8" />
        <span className="text-lg font-semibold">1</span>
        <span className="text-2xl font-bold">=</span>
        <span className="text-lg font-semibold">{rates.EUR}</span>
        <img src={euroIcon} alt="Euro" className="w-8 h-8" />
      </div>
      <div className="border-l-2 border-green-900 h-16"></div>
      <div className="flex items-center space-x-2">
        <img src={dollarIcon} alt="Dollar" className="w-8 h-8" />
        <span className="text-lg font-semibold">1</span>
        <span className="text-2xl font-bold">=</span>
        <span className="text-lg font-semibold">{rates.MAD}</span>
        <img src={madIcon} alt="Coins" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default ExchangeRates;
