import React, { useState } from 'react';

export function QuizQuestion() {
  const questions = [
    "I feel comfortable talking about my feelings with others.",
    "I often feel overwhelmed by stress or daily challenges.",
    "I have people in my life who provide me with emotional support.",
    "I feel confident in my abilities and value myself.",
    "I know where to find mental health resources if I need them.",
    "I regularly take time for relaxation or mindfulness practices.",
    "I am able to balance my work or studies with personal life.",
    "I feel capable of handling difficult situations in life."
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState('');

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    if (newAnswers[questionIndex] === optionIndex) {
      newAnswers[questionIndex] = null;
    } else {
      newAnswers[questionIndex] = optionIndex;
    }
    setAnswers(newAnswers);
    setError('');
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setError('Please answer all questions before submitting.');
    } else {
      setError('');
      // Handle form submission here
      console.log('Quiz submitted with answers:', answers);
      // process answers here or redirect to a results page
    }
  };

  return (
    <div className="QuizQuestionContainer">
            <img src="./public/img/quizquestion.jpeg" alt="takingquiz" className="QuizQuestionImage" />
      <h2 className="QuizInstructions">Using the key below, answer the questions based on how strongly you agree or disagree with the statement</h2>
      <div className="KeyContainer">
        <div>STRONGLY DISAGREE</div>
        <div>NEUTRAL</div>
        <div>STRONGLY AGREE</div>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="QuestionContainer">
          <p>{index + 1}. {question}</p>
          <div className="AnswerOptions">
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, idx) => (
              <div 
                key={idx} 
                className={`AnswerCircle ${answers[index] === idx ? 'selected' : ''}`} 
                onClick={() => handleSelectAnswer(index, idx)}
              >
                <div className="Circle"></div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {error && <p className="ErrorMessage">{error}</p>}
      <button className="submitButton" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}