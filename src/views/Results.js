import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Component Imports
/* import RadarChartComponent from '../components/charts/RadarChartComponent'; */
import ProgressRingsComponent from '../components/charts/ProgressRingsComponent';


const ResultsView = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('user:', user);
  const uid = user.uid;
  console.log('uid:', uid);

  const [sortType, setSortType] = useState('none');
  const [data, setData] = useState([]);

  const sectionData = [
    { name: 'Faith', color: '#faf089' },
    { name: 'Hope', color: '#48bb78' },
    { name: 'Charity', color: '#e53e3e' },
    { name: 'Virtue', color: '#f6e05e' },
    { name: 'Integrity', color: '#a0aec0' },
    { name: 'Knowledge', color: '#f6ad55' },
    { name: 'Patience', color: '#9f7aea' },
    { name: 'Humility', color: '#63b3ed' },
    { name: 'Diligence', color: '#dd6b20' },
    { name: 'Obedience', color: '#f687b3' },
  ];

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user-responses/${uid}`);
          const rawData = response.data;

          const aggregatedData = sectionData.map((section) => {
            const responsesForSection = rawData.filter(r => r.section === section.name);
            const sumOfResponses = responsesForSection.reduce((sum, r) => sum + r.response, 0);
            const totalQuestions = responsesForSection.length;
            console.log('sumOfResponses:', sumOfResponses);

            console.log('Section name:', section.name);
            console.log('Section color:', section.color);
            console.log('Total questions:', totalQuestions);
            console.log('Average score:', totalQuestions > 0 ? sumOfResponses / totalQuestions : 0);
            return {
              name: section.name,
              color: section.color,
              averageScore: totalQuestions > 0 ? sumOfResponses / (totalQuestions * 5) : 0
            };
          });

          setData(aggregatedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } else {
      console.error('User not authenticated');
      // Redirect to login
    }
  }, [user, uid]);


  const calculateScorePercentage = (item) => {
    return item.sumOfResponses / (item.totalQuestions * 5);
  };

  const sortedData = data.sort((a, b) => {
    switch (sortType) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'score-asc': return a.averageScore - b.averageScore;
      case 'score-desc': return b.averageScore - a.averageScore;
      default: return 0;
    }
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
      <ProgressRingsComponent data={sortedData} />
    </div>
  );
};

export default ResultsView;
