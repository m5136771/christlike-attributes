import React, { useState } from 'react';
import RadarChartComponent from '../components/charts/RadarChartComponent';
import ProgressRingsComponent from '../components/charts/ProgressRingsComponent';

const data = [
  { name: 'Faith', totalQuestions: 9, sumOfResponses: 37, color: '#faf089' },
  { name: 'Hope', totalQuestions: 4, sumOfResponses: 13, color: '#48bb78' },
  { name: 'Charity', totalQuestions: 10, sumOfResponses: 35, color: '#e53e3e' },
  { name: 'Virtue', totalQuestions: 6, sumOfResponses: 24, color: '#f6e05e' },
  { name: 'Integrity', totalQuestions: 8, sumOfResponses: 32, color: '#a0aec0' },
  { name: 'Knowledge', totalQuestions: 5, sumOfResponses: 20, color: '#f6ad55' },
  { name: 'Patience', totalQuestions: 6, sumOfResponses: 22, color: '#9f7aea' },
  { name: 'Humility', totalQuestions: 6, sumOfResponses: 25, color: '#63b3ed' },
  { name: 'Diligence', totalQuestions: 7, sumOfResponses: 30, color: '#dd6b20' },
  { name: 'Obedience', totalQuestions: 7, sumOfResponses: 28, color: '#f687b3' },
];

const ResultsView = () => {
  const [sortType, setSortType] = useState('none');

  const calculateScorePercentage = (item) => {
    return item.sumOfResponses / (item.totalQuestions * 5);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortType === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortType === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortType === 'score-asc') {
      return calculateScorePercentage(a) - calculateScorePercentage(b);
    }
    if (sortType === 'score-desc') {
      return calculateScorePercentage(b) - calculateScorePercentage(a);
    }
    return 0;
  });

  return (
    <div className='p-4 text-center'>
      <h2 className='text-2xl font-bold mb-4'>Your Christlike Attributes Assessment Results</h2>
      <div className='flex justify-center items-center mb-4'>
        <select onChange={(e) => setSortType(e.target.value)} className='p-2 border border-gray-300 rounded-md'>
          <option value='none'>Sort by</option>
          <option value='name-asc'>Name (A-Z)</option>
          <option value='name-desc'>Name (Z-A)</option>
          <option value='score-asc'>Score (Low to High)</option>
          <option value='score-desc'>Score (High to Low)</option>
        </select>
      </div>
      {/* <RadarChartComponent /> */}
      <ProgressRingsComponent data={sortedData} />
    </div>
  );
};

export default ResultsView;
