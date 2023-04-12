// frontend/src/store/session.js
import { csrfFetch } from './csrf';

// adding store action and reducers 

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';



// action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}
const removeUser = (user) => {
  return {
    type: REMOVE_USER,
    //payload: {}
  }
}

// thunk actions
  // login:
export const login = (user) => async (dispatch) => {
  const {credential, password} = user;
  const response = await csrfFetch(
    '/api/session',
    {
      method: 'POST',
      body:JSON.stringify({
        credential,
        password,
      }),
    })
  const data = await response.json()
  dispatch (setUser(data.user));
  return response;
}

  // logout:
export const logout = () => async (dispatch) => {
    
    const response = await csrfFetch(
      '/api/session',
      {
        method: 'DELETE'
      })
    //const data = await response.json()
    dispatch (removeUser());
    return response;
  }
   // restore:   
export const restoreUser = () => async (dispatch) => {

  
  const response = await csrfFetch(
    '/api/session',
    {
      method: 'GET',
    }
  )
  const data = await response.json()
  dispatch (setUser(data.user));
  return response;
} 

export const signup = (user) => async (dispatch) => {
  const {username, email, password} = user;
 
  const response = await csrfFetch(
    '/api/users',
    {
      method: 'POST',
      body:JSON.stringify({
        username,
        email,
        password,
      }),
    })
  const data = await response.json()
  dispatch (setUser(data.user));
  return response;
}

// reducer:
const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = initialState.user;
      return newState;
    
    default:
      return state;
  }
}
export default sessionReducer;