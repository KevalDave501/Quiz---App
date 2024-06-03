import React from 'react';
import { useSelector } from 'react-redux';

const AnswerPageComponent = () => {
  const quiz = useSelector(state => state.quiz);
  const totalQuestions = quiz.questions.length;
  const correctAnswers = quiz.questions.filter(q => q.answer === quiz.answers[q.id]).length;
  const percentage = (correctAnswers / totalQuestions) * 100;

  let feedback;
  if (percentage >= 80) {
    feedback = (
      <div className="alert alert-success" role="alert">
        Congratulations! You scored {percentage.toFixed(2)}%.
      </div>
    );
  } else if (percentage >= 40) {
    feedback = (
      <div className="alert alert-warning" role="alert">
        Good effort! You scored {percentage.toFixed(2)}%.
      </div>
    );
  } else {
    feedback = (
      <div className="alert alert-danger" role="alert">
        Oops! You scored {percentage.toFixed(2)}%.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">{quiz.title} - Results</h1>
              {feedback}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerPageComponent;