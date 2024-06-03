import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import QuizComponent from './QuizComponent';
import QuestionCountComponent from './QuestionCountComponent';
import AnswerPageComponent from './AnswerPageComponent';

const App = () => {
  const [step, setStep] = useState('questionCount');

  const handleNext = () => {
    setStep('quiz');
  };

  const handleQuizEnd = () => {
    setStep('answer');
  };

  return (
    <Provider store={store}>
      {step === 'questionCount' && <QuestionCountComponent onNext={handleNext} />}
      {step === 'quiz' && <QuizComponent onQuizEnd={handleQuizEnd} />}
      {step === 'answer' && <AnswerPageComponent />}
    </Provider>
  );
};

export default App;
