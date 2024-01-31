import React, { useState, useEffect } from 'react';
import Question from './Question';
import axios from 'axios';

const { DATA_API_KEY } = require('../config.json');

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    }, []);

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
    console.log('Current question index:', current); // Log current question index
  }

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
    console.log('Current question index:', current); // Log current question index
  }

  const recordResponse = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
    console.log('Responses:', responses); // Log responses
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="progress-bar"> {/* Progress Bar Here */} </div>
      {questions.length > 0 && (
        <Question
          data={questions[current]}
          recordResponse={recordResponse}
        />
      )}
      <div className="flex justify-between">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Questionnaire;