import { useState } from 'react'
import { useEffect } from "react"
import { About } from "./components/about"
import {ResourceList} from "./components/ResourceList"
import { Map } from "./components/Map"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { Home } from "./components/Home"
import { Routes, Route, Navigate } from 'react-router-dom';
import { Quiz } from './components/Quiz';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import { ResourceDetails } from "./components/ResourceDetails";
import { Login } from "./components/Login" ;
import { User } from "./components/User";
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function App() {

  const [user, setUser] = useState("");
  const [savedResources, setSavedResources] = useState(null);
  const [recommendedTags, setRecommendedTags] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        console.log(firebaseUser);
        const userRef = ref(db, firebaseUser.uid + "/resources");
        onValue(userRef, (snapshot) => {
          const userResourcesObj = snapshot.val();
          if (userResourcesObj) {
            const userResourcesKeys = Object.keys(userResourcesObj);
            const userResources = userResourcesKeys.map((key) => {
              const resourceNum = userResourcesObj[key];
              const resourceObj = {resourceNum, key};

              return resourceObj;
            })
            setSavedResources(userResources);
          }
        })
      } else {
        setUser(null);
        setSavedResources(null);
        console.log("logged out");
      }
      // navigate('/');
    })

    return unsubscribe;
  }, [auth]);

  // Handle quiz completion by setting recommended tags and quiz completion state
  const handleQuizCompletion = (tags) => {
    setRecommendedTags(tags);
    setIsQuizComplete(true);
    navigate('/quizresult');
  };

  // Handle quiz retake, resetting quiz completion state and tags
  const handleRetakeQuiz = () => {
    setIsQuizComplete(false);
    setRecommendedTags([]);
    navigate('/quizquestion');
  };

  function saveResource(resourceNum) {
    //resourceNum example would be "22"
    const location = ref(db, user.uid + "/resources");

    if (!user) {
        navigate("/login");
    } else {
        firebasePush(location, resourceNum);
    }
  }

  function deleteResource(resourceNum) {
    let newSavedResources = [];
    savedResources.forEach((resource) => {
      if (resource.resourceNum != resourceNum) {
        newSavedResources.push(resource);
      } else {
        const location = ref(db, user.uid + "/resources/" + resource.key);
        firebaseSet(location, null);
      }
    })
    setSavedResources(newSavedResources);
  }

  return (
    <div className="app-container">
      <Navbar user={user}/>
      <div className="main-content">
        <Routes>
         <Route path="*" element={<Home />} />
         <Route path="about" element={<About />} />
         <Route path="map" element={<Map user={user} saveResource={saveResource} savedResources={savedResources} deleteResource={deleteResource}/>} />
         <Route path="quiz" element={<Quiz />} />
         <Route path="quizquestion" element={<QuizQuestion onComplete={handleQuizCompletion} />} />
         <Route path="quizresult" element={<QuizResult recommendedTags={recommendedTags} onRetakeQuiz={handleRetakeQuiz} user={user} saveResource={saveResource} savedResources={savedResources} deleteResource={deleteResource}/>} />
         <Route path="resources" element={<ResourceList user={user} saveResource={saveResource} savedResources={savedResources} deleteResource={deleteResource}/>} />
         <Route path="resources/:id" element={<ResourceDetails user={user} saveResource={saveResource} savedResources={savedResources} deleteResource={deleteResource}/>} />
         <Route path="login" element={<Login user={user}/> } />
         <Route path="user" element={<User user={user} saveResource={saveResource} savedResources={savedResources} deleteResource={deleteResource}/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
