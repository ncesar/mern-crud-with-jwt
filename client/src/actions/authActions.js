import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//check token & load user

export const loadUser = () => (dispatch, getState) => {//dispatch é usado como um callback que é invocado assim que uma função async é completa. no redux-thunk dispatch é simplesmente uma função que dispara uma ação para a Store do Redux, por ex, depois de carregar data de uma api
    //user loading
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({ 
            type: USER_LOADED,
            payload: res.data
         }))
         .catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status));//do errorActions
             dispatch({
                 type: AUTH_ERROR
             });
         });
}

//register user
export const register = ({ name, email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request data

    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));//do errorActions
            dispatch({
                type: REGISTER_FAIL
            });
        })
}

//login user

export const login = ({ email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request data

    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));//do errorActions
            dispatch({
                type: LOGIN_FAIL
            });
        })
}


//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config/headers and token
export const tokenConfig = getState => {
        //get token from localStorage
        const token = getState().auth.token;//ta pegando do authReducer

        //Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
    
        // if token, then add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
}
