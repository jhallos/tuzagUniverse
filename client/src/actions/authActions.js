import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from '../constants'
import setAuthHeader from '../utils/setAuthHeader'

export const loginUser = (userData) => dispatch => {
  axios.post('http://localhost:5000/api/users/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthHeader(token)
      dispatch(getCurrentUser())
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res=> history.push('/login'))
        .catch(function (error) {
            const errorMessage = (()=> {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response.data;
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                return error.request;
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                return error.message;
              }
            })();
          
            dispatch({
              type: GET_ERRORS,
              payload: errorMessage
            })
          });
}
export const getCurrentUser = () => dispatch=> {
  axios.get('http://localhost:5000/api/users')
    .then(res => dispatch(setCurrentUser(res.data)))
}
export const setCurrentUser = () => {
  return({
    type: SET_CURRENT_USER
    //,
    //payload: data
  })
}
export const sendMessage = (userData) => dispatch=>{
  axios.post('http://localhost:5000/api/users/register', userData)
  //return({
    //type: SET_CURRENT_USER
    //,
    //payload: data
  //})
}