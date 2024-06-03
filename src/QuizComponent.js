import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAnswer } from './redux/actions/quizActions';

const QuizComponent = ({ onQuizEnd }) => {
  const quiz = useSelector(state => state.quiz);
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [totalQuizTime, setTotalQuizTime] = useState(0); 
  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    const totalSeconds = quiz.questions.length * 60;
    setTotalQuizTime(totalSeconds);
    setTimeLeft(totalSeconds);
    
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          handleNextQuestion();
          return totalSeconds;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    dispatch(setAnswer(questionId, answer));
  };

  const handleNextQuestion = () => {
    const currentAnswer = quiz.answers[currentQuestion.id];

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizEnd();
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizEnd();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentQuestion) return null;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{quiz.title} </h1>
      <h2>Total Quiz Time: {formatTime(totalQuizTime)}</h2>
      <h3>Time Left: {formatTime(timeLeft)}</h3>
      <form>
        <div key={currentQuestion.id} className="mb-3">
          <p>{currentQuestionIndex + 1}. {currentQuestion.question}</p>
          {currentQuestion.type === 'boolean' && (
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value="true"
                  onChange={() => handleAnswerChange(currentQuestion.id, true)}
                />
                <label className="form-check-label">True</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value="false"
                  onChange={() => handleAnswerChange(currentQuestion.id, false)}
                />
                <label className="form-check-label">False</label>
              </div>
            </div>
          )}
          {currentQuestion.type === 'multiple-choice' && (
            <div>
              {currentQuestion.options.map(option => (
                <div key={option} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          )}
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              className="form-control"
              onChange={e => handleAnswerChange(currentQuestion.id, e.target.value)}
            />
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-primary" onClick={handlePreviousQuestion}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={handleSkipQuestion}>Skip</button>
          <button type="button" className="btn btn-primary" onClick={handleNextQuestion}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default QuizComponent;
