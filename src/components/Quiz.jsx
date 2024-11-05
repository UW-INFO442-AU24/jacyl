
import { useNavigate } from 'react-router-dom';

export function Quiz() {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
      navigate('/QuizQuestion');
    };
    return (
      <div className="QuizContainer">
        <h1 className="QuizTitle">Ready to Take the First Step?</h1>
        <div className="QuizContentWrapper">
          <div className="QuizImageContainer">
            <img src="./public/img/Quiz.jpg" alt="Chilling" className="QuizImage" />
          </div>
          <div className="Quizcontent">
            <h2 className="QuizSubtitle">Discover More About Yourself</h2>
            <p className="QuizDescription">Take the quiz to give you a sense of whether you might be experiencing symptoms that could be addressed or alleviated via therapy or other professional help.</p>
            <button className="quizbutton" onClick={handleStartQuiz}>Take the Quiz</button>
          </div>
        </div>
      </div>
    )
  }
  