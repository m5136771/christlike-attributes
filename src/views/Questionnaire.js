import React, { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import questions from '../question-bank';
/* import axios from 'axios'; */

/* const { DATA_API_KEY } = require('../config.json'); */

const sectionColors = {
  Faith: '#f9d71c', // Sunflower Yellow
  Diligence: '#4caf50', // Emerald Green
  Virtue: '#3182ce', // Sky Blue
  Obedience: '#333333', // Dark Charcoal
  Charity: '#e53e3e', // Crimson Red
  Hope: '#f6ad55', // Sunset Orange
  Knowledge: '#805ad5', // Amethyst Purple
  Patience: '#38b2ac', // Turquoise
  Humility: '#a0aec0', // Stone Gray
  Integrity: '#2c5282' // Ocean Blue
};

const Questionnaire = () => {
  /* const [questions, setQuestions] = useState([]); */
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState({});
  const currentSection = questions[current].section;
  const remainingInSection = questions.slice(current).filter(q => q.section === currentSection).length;
  /* const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); */

  const getSectionColor = (section) => {
    return sectionColors[section] || '#ffffff';
  };

  const progressPercentage = (current / questions.length) * 100;

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.stringify({
          "collection": "questions",
          "database": "becoming",
          "dataSource": "Cluster0",
          "projection": { "_id": 1 }
        });

        const config = {
          method: 'get',
          url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-pmgwa/endpoint/data/v1',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': DATA_API_KEY
          },
          data: data
        };

        const response = await axios(config);
        setQuestions(response.data.documents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

      fetchData();
    }, []); */

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
    console.log('Current question index:', current);
  }

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
    console.log('Current question index:', current);
  }

  const recordResponse = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
    console.log('Responses:', responses);
  };

  /* if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } */

  return (
    <div
      style={{ backgroundColor: getSectionColor(currentSection) }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-semibold text-gray-700">{currentSection}</h2>
      <p>{remainingInSection} questions remaining in this section</p>
      
      <ProgressBar 
        questions={questions} 
        current={current} 
        sectionColors={sectionColors}
      />

      {questions.length > 0 && (
        <QuestionCard
          current={current}
          sectionColors={sectionColors}
        />
      )}
    </div>
  );
};

export default Questionnaire;