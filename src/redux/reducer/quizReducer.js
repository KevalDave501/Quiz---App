import { SET_QUIZ, SET_ANSWER } from '../actions/quizActions';

const initialState = {
  title: '',
  questions: [],
  answers: {}
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        title: action.payload.title,
        questions: action.payload.questions
      };
    case SET_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer
        }
      };
    default:  
      return state;
  }
};

export default quizReducer;
