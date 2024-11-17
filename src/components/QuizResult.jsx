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
  // if (filteredResources.length > 3){
  // filteredResources = filteredResources.sort(() => 0.5 - Math.random());
  // filteredResources = filteredResources.slice(0, 3);
  // }

  if (filteredResources.length > 3){
    filteredResources = getTopMatches(filteredResources, recommendedTags)
    console.log(filteredResources)
  }
  // return(<div/>);
  return (
    <div className="QuizResultContainer">
      <h2>Your Recommended Resources</h2>
      {filteredResources.length > 0 ? (
        <div className="cardGrid">
          {filteredResources.map((resource, index) => (
            <div key={index} className="resourceCard">
              <h3>{resource.resource.properties.resourceName}</h3>
              <p>Address: {resource.resource.properties.address}</p>
              <p>Phone: {resource.resource.properties.phoneNumber}</p>
              <a href={resource.resource.properties.website} target="_blank" rel="noopener noreferrer">
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


function getTopMatches(resourceList, recommendedResourceTags) {
  // Function will intake the resource tags list, and the 
  // Reccommended quiz tags and return the top 3 highest matched quiz tags
  
  const scoreMatches = (resource) => {
    let resourceTags = resource.properties.serviceType; 
    let numMatches = 0;
    for (let i = 0; i < resourceTags.length; i++) {
      if (recommendedResourceTags.includes(resourceTags[i])) {
        numMatches++;
      }
    }
    return numMatches;
  }
  // Store the scored results
  const resourceListScored = resourceList.map((resource) => ({resource, score: scoreMatches(resource) }));

  // Sort the scored lists by score in descending order
  resourceListScored.sort((a, b) => b.score - a.score);

  // Return the top 3 lists
  return resourceListScored.slice(0, 3);
}
  // if (filteredResources.length > 3){
  //   filteredResources = getTopMatches(filteredResources, recommendedTags)
  // }