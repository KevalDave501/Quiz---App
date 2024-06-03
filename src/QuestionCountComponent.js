import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuiz } from './redux/actions/quizActions';
import { quizData } from './utills/quizData';
import shuffle from 'lodash/shuffle';

const QuestionCountComponent = ({ onNext }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const count = Number(e.target.value);
    if (count <= 30) {
      setQuestionCount(count);
    } else {
      setQuestionCount(30); 
    }
  };

  const handleSubmit = () => {
    let questions = shuffle(quizData.questions).slice(0, questionCount);
    dispatch(setQuiz({ title: quizData.title, questions }));
    onNext();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">General Knowledge Quiz</h1>
              <div className="form-group">
                <label htmlFor="questionCount">How many questions do you want?</label>
                <input
                  className="form-control"
                  type="number"
                  id="questionCount"
                  value={questionCount}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleSubmit}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCountComponent;
