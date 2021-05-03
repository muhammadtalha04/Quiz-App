import { combineReducers, createStore } from 'redux';
import { formReducer } from '../reducers/FormReducer';
import { questionsReducer } from '../reducers/QuestionsReducer';
import { quizReducer } from '../reducers/QuizReducer';
import { timerReducer } from '../reducers/TimerReducer';

const RootReducer = combineReducers({
	question: questionsReducer,
	quiz: quizReducer,
	timer: timerReducer,
	formState: formReducer,
});

const store = createStore(RootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export type RootState = ReturnType<typeof store.getState>;

export default store;
