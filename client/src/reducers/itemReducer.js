//aqui é onde o nosso state vai.
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
  loading: false,

};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,//pq o payload, no arquivo itemsActions ta recebendo res.data
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items] //por que utilizamos o spread? R: pq não podemos fazer uma mutação no state. Não podemos alterar ele diretamente, precisamos fazer 1 cópia dele
      }  
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }  
    default:
      return state;
  }
}