import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';

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
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const isQuestionAvailable = currentQuestion < questions.length;
  const currentSection = isQuestionAvailable ? questions[currentQuestion].section : '';
  const remainingInSection = isQuestionAvailable ? questions.slice(currentQuestion).filter(q => q.section === currentSection).length : 0;

  // Set Background Color based on current section
  const getSectionColor = (section) => {
    return sectionColors[section] || '#ffffff';
  };

  const handleResponse = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle final submission here
      navigate('/results');
    }
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div
      style={{ backgroundColor: getSectionColor(currentSection) }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-semibold text-gray-700">{currentSection}</h2>
      <p>{remainingInSection} questions remaining in this section</p>

      <ProgressBar
        questions={questions}
        current={currentQuestion}
        sectionColors={sectionColors}
        progressPercentage={progressPercentage}
      />

      {isQuestionAvailable && (
        <QuestionCard
          question={questions[currentQuestion]}
          handleResponse={handleResponse}
          handlePrev={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          handleNext={handleNext}
          current={currentQuestion}
          total={questions.length}
        />
      )}
    </div>
  );
};

export default Questionnaire;