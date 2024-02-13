import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Component Imports
import ProgressBar from '../components/ProgressBar';

// Asset Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  // Question States
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Response States
  const [responses, setResponses] = useState({});
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [selectedResponseId, setSelectedResponseId] = useState(null);

  // Other States
  const [error, setError] = useState(null);

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

  const currentQuestion = questions[currentQuestionIndex];
  const isQuestionAvailable = currentQuestionIndex < questions.length;
  const currentSection = isQuestionAvailable ? currentQuestion.section : '';
  const remainingInSection = isQuestionAvailable ? questions.slice(currentQuestionIndex).filter(q => q.section === currentSection).length : 0;

  // Set Background Color based on current section
  const getSectionColor = (section) => {
    return sectionColors[section] || '#ffffff';
  };

  const handleResponseChange = (e) => {
    setSelectedResponse(e.target.value);
  };

  const handleResponseSubmit = async () => {
    console.log('Response Chosen:', selectedResponse);
    console.log('Current Question:', currentQuestion._id);
    console.log('User ID:', uid);

    if (selectedResponse) {
      try {
        const existingResponse = await getExistingResponse();
        console.log('Existing Response:', existingResponse);
        
        if (existingResponse) {
          console.log('Existing Response ID:', existingResponse._id);
          await updateResponse(existingResponse);
        } else {
          await createNewResponse();
        }

        setSelectedResponse(null);
        handleNext();
      } catch (error) {
        console.error('Error submitting response:', error);
      }
    } else {
      // Display error message to user that response needs to be selected
      console.log('Response needs to be selected');
      setError('Please select a response before continuing');
    }
  };

  const getExistingResponse = async () => {
    console.log('Fetching existing response...');
    try {
      const response = await axios.get(`http://localhost:5000/api/responses/${currentQuestion._id}/${uid}`);
      setSelectedResponseId(response.data._id);
      console.log('Existing response ID:', selectedResponseId);
      console.log('Existing response found:', response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No existing response found');
        setSelectedResponseId(null);
        return null;
      } else {
        console.error('Error fetching existing response:', error);
      }
    }
  };

  const createNewResponse = async () => {
    console.log('Creating new response...');
    try {
      const newResponse = {
        question: currentQuestion._id,
        user: uid,
        response: selectedResponse
      };

      const response = await axios.post('http://localhost:5000/api/responses', newResponse);
      console.log('New response created:', response.data);
    } catch (error) {
      console.error('Error creating new response:', error);
    }
  };

  const updateResponse = async (existingResponse) => {
    console.log('Updating existing response...');
    try {
      const updatedResponse = {
        ...existingResponse.data,
        response: selectedResponse
      };

      const response = await axios.put(`http://localhost:5000/api/responses/${existingResponse.data._id}`, updatedResponse);
      console.log('Response updated:', response.data);
    } catch (error) {
      console.error('Error updating response:', error);
    }
  };

  const handleNext = () => {
    if (selectedResponse) {
      setResponses(prev => ({ ...prev, [currentQuestion._id]: selectedResponse }));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      navigate('/results', { state: { responses } });
    }
    setSelectedResponse(null);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const progressPercentage = (currentQuestionIndex / questions.length) * 100;

  if (!isQuestionAvailable) {
    return null;
  };

  return (
    <div
      style={{ backgroundColor: getSectionColor(currentSection) }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-semibold text-gray-700">{currentSection}</h2>
      <p>{remainingInSection} questions remaining in this section</p>

      <ProgressBar
        questions={questions}
        current={currentQuestionIndex}
        sectionColors={sectionColors}
        progressPercentage={progressPercentage}
      />

      {error && <p className="text-red-500">{error}</p>}

      {isQuestionAvailable && (
        <div className="w-3/4 md:w-1/2 lg:w-1/3 bg-light-gray border p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-3">{currentQuestion.text}</h2>
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={option}
                  checked={selectedResponse === option.toString()}
                  className="form-radio h-5 w-5 text-gentle-gold"
                  onChange={handleResponseChange}
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          {currentQuestion.reference && (
            <p className="text-soft-lavender text-sm mt-2 italic">
              {currentQuestion.reference}
            </p>
          )}
          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="text-dark-charcoal font-lato">
              {currentQuestionIndex + 1} of {questions.length}
            </span>
            <button
              onClick={handleResponseSubmit}
              disabled={selectedResponse === null}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <FontAwesomeIcon icon={faArrowRight} />
              ) : (
                'Submit Final Answers'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;