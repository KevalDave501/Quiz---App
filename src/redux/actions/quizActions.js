export const SET_QUIZ = 'SET_QUIZ';
export const SET_ANSWER = 'SET_ANSWER';

export const setQuiz = (quizData) => {
  return {
    type: SET_QUIZ,
    payload: quizData
  };
};

export const setAnswer = (questionId, answer) => {
  return {
    type: SET_ANSWER,
    payload: { questionId, answer }
  };
};
