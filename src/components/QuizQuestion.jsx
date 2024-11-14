import React, { useState } from 'react';

export function QuizQuestion({ onComplete }) {
  const questions = [
    "I feel comfortable talking about my feelings with others.",
    "I identify with one of these groups:",
    "I prefer to have counseling in another language other than English.",
    "I’d like to involve my guardians in the therapy process.",
    "I need more rapid mental health assistance.",
    "I’m having difficulties with managing my stress related to school.",
    "I would prefer to be in services catered to youth.",
    "I’m looking for someone to help me navigate mental health resources."
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState('');

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = newAnswers[questionIndex] === optionIndex ? null : optionIndex;
    setAnswers(newAnswers);
    setError('');
  };

  const handleIdentitySelect = (identityTag) => {
    const newAnswers = [...answers];
    newAnswers[1] = newAnswers[1] === identityTag ? null : identityTag;
    setAnswers(newAnswers);
    setError('');
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setError('Please answer all questions before submitting.');
    } else {
      setError('');
      const tags = generateTagsFromAnswers(answers);
      onComplete(tags);
    }
  };

  const generateTagsFromAnswers = (answers) => {
    const tags = [];
  
    if (answers[0] >= 3) tags.push('Individual Therapy', 'Group Therapy', 'Peer Support');
    if (answers[1] && answers[1] !== 'None of the above') tags.push(answers[1]);
    if (answers[2] >= 3) tags.push('Bilingual Services');
    if (answers[3] >= 3) tags.push('Family Therapy', 'Dyadic Therapy');
    if (answers[4] >= 3) tags.push('Crisis Hotline', 'Psychiatric Provider');
    if (answers[5] >= 3) tags.push('School-Based Services', 'Youth');
    if (answers[6] >= 3) tags.push('Youth', 'All Age Groups');
    if (answers[7] >= 3) tags.push('Case Management', 'Peer Support');
  
    return [...new Set(tags)];  // Ensures unique tags
  };
  

  return (
    <div className="QuizQuestionContainer">
      <img src="./public/img/quizquestion.jpeg" alt="TakingQuiz" className="QuizQuestionImage" />
      <h2 className="QuizInstructions">Using the key below, answer the questions based on how strongly you agree or disagree with the statement</h2>
      
      {questions.map((question, index) => (
        <div key={index} className="QuestionContainer">
          <p>{index + 1}. {question}</p>
          {index === 1 ? (
            <div className="IdentityOptions">
              {['LGBTQ+', 'Asian', 'Latino', 'None of the above'].map((option) => (
                <div
                  key={option}
                  className={`IdentityOption ${answers[1] === option ? 'selected' : ''}`}
                  onClick={() => handleIdentitySelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      ))}

      {error && <p className="ErrorMessage">{error}</p>}
      <button className="submitButton" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}
