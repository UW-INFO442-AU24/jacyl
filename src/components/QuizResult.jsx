// File contains the result after taking the quiz by recommending resources based on answers

import React from 'react';
import data from "../data/resources1.json";
import { Link } from "react-router-dom";
import { useState } from "react";

export function QuizResult({ recommendedTags, onRetakeQuiz, user, saveResource, deleteResource, savedResources }) {
  const [confirm, setConfirm] = useState();



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
    filteredResources = filteredResources.map((resource) => {
      return resource.resource;
    })
  }

  // return(<div/>);
  return (
    <div className="QuizResultContainer">
      <h2>Your Recommended Resources</h2>
      {filteredResources.length > 0 ? (
        <div className="cardGrid">
          {filteredResources.map((resource, index) => {
            let saveButton = "";
            if (user) {
              saveButton = <button className="btn btn-success mt-4" onClick={() => {saveResource(resource.resourceNum); setConfirm(<p className="mt-2">"{resource.properties.resourceName}" has been successfully added to your <Link to="/user">profile</Link>.</p>)}}>Save Resource</button>
              if (savedResources) {
                savedResources.forEach((savedResource) => {
                    if (savedResource.resourceNum == resource.resourceNum) {
                        saveButton = <button className="btn btn-danger mt-4" onClick={() => {deleteResource(resource.resourceNum); setConfirm(<p className="mt-2">"{resource.properties.resourceName}" has been successfully removed from your <Link to="/user">profile</Link>.</p>)}}>Delete Saved Resource</button>
                        //if wanted faster performance, use break + for loop so it doesn't loop through everything
                    }
                });
              }
            }

            return (
            <div key={index} className="resourceCard">
              <h3>{resource.properties.resourceName}</h3>
              <p>Address: {resource.properties.address}</p>
              <p>Phone: {resource.properties.phoneNumber}</p>
              <a href={resource.properties.website} target="_blank" rel="noopener noreferrer">
                Website
              </a>
              <p>Want more details? <Link to={"/resources/" + resource.resourceNum}>Click here.</Link></p>
              {saveButton}
            </div>
            )
            })}
        </div>
      ) : (
        <p>No recommended resources found based on your quiz results.</p>
      )}
      {user && confirm}
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