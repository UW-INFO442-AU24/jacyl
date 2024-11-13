import React from 'react';
import data from "../data/resources1.json"; 

export function QuizResult({ recommendedTags, onRetakeQuiz }) {
    const filteredResources = data.resources.filter((resource) =>
      resource.properties.serviceType.some(tag => recommendedTags.includes(tag))
    );
  
    return (
      <div className="QuizResultContainer">
        <h2>Your Recommended Resources</h2>
        {filteredResources.length > 0 ? (
          <div className="cardGrid">
            {filteredResources.map((resource, index) => (
              <div key={index} className="resourceCard">
                <h3>{resource.properties.resourceName}</h3>
                <p>Address: {resource.properties.address}</p>
                <p>Phone: {resource.properties.phoneNumber}</p>
                <a href={resource.properties.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No recommended resources found based on your quiz results.</p>
        )}
        <button onClick={onRetakeQuiz} className="retakeQuizButton">Retake Quiz</button>
      </div>
    );
  }