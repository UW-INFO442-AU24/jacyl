import React from 'react';
import data from "../data/resources1.json";
import { Link } from "react-router-dom";

export function QuizResult({ recommendedTags, onRetakeQuiz }) {



  let filteredResources = data.resources.filter((resource, index) => {
    resource["resourceNum"] = index;
    return resource.properties.serviceType.some(tag => recommendedTags.includes(tag));
  }
  );
  // Grab 3 of the resources to reccommend
  if (filteredResources.length > 3){
  filteredResources = filteredResources.sort(() => 0.5 - Math.random());
  filteredResources = filteredResources.slice(0, 3);
  }

  // if (filteredResources.length > 3){
  //   filteredResources = getTopMatches(filteredResources, recommendedTags)
  // }

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
              <p>Want more details? <Link to={"/resources/" + resource.resourceNum}>Click here.</Link></p>
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


function getTopMatches(resourceList, reccommendedResourceTags) {
  // Function will intake the resource tags list, and the 
  // Reccommended quiz tags and return the top 3 highest matched quiz tags
  
  const scoreMatches = (resource) => {
    let numMatches = 0;
    for (let i = 0; i < resource.length; i++) {
      if (reccommendedResourceTags.includes(resource[i])) {
        numMatches++;
      }
    }

  }
  // Store the scored results
  const scoredMatchLists = resourceList.properties.map((resource) => ({ resource, score: scoreMatches(resource) }));

  // Sort the scored lists by score in descending order
  scoredMatchLists.sort((a, b) => b.score - a.score);

  // Return the top 3 lists
  return scoredMatchLists.slice(0, 3);
}
  // if (filteredResources.length > 3){
  //   filteredResources = getTopMatches(filteredResources, recommendedTags)
  // }