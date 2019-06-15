//agrupar todos os outros reducers
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({//aqui vai os reducers(so temos 1 por eqt, que é o item)
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});