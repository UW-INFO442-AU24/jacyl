export function QuizQuestion() {
    const questions = [
      "I feel comfortable talking about my feelings with others.",
      "I often feel overwhelmed by stress or daily challenges.",
    ];
  
    return (
      <div className="QuizQuestionContainer">
        <h2>Using the key below, answer the questions based on how strongly you agree or disagree with the statement</h2>
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
                <div key={idx} className="AnswerCircle">
                  <div className="Circle"></div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
