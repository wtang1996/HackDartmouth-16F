import axios from 'axios';
import { browserHistory } from 'react-router';

export const ActionTypes = {
  FETCH_LISTS: 'FETCH_LISTS',
  FETCH_LIST: 'FETCH_LIST',
  CREATE_LIST: 'CREATE_LIST',
  UPDATE_LIST: 'UPDATE_LIST',
  DELETE_LIST: 'DELETE_LIST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
  FETCH_MESSAGE_ERROR: 'FETCH_MESSAGE_ERROR',
};

const ROOT_URL = 'https://hw5p2.herokuapp.com/api';
// const ROOT_URL = 'https://hackathon-undecided.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

export function errorMessage(error) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MESSAGE, message: error });
    browserHistory.push('/error');
  };
}

export function fetchLists() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/lists`).then(response => {
      console.log(response);
      dispatch({ type: ActionTypes.FETCH_LISTS, lists: response.data });
    }).catch(error => {
      console.log(error.response);
    });
  };
}

export function createList(list) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/lists`, list, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({ type: ActionTypes.CREATE_LIST, payload: { list } });
      browserHistory.push('/');
    }).catch(error => {
      dispatch(errorMessage(`Error creating list: ${error.response}`));
    });
  };
}

export function fetchList(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/lists/${id}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_LIST, list: response.data });
    }).catch(error => {
      dispatch(errorMessage(`Error fetching list: ${error.response}`));
    });
  };
}

export function updateList(list, id) {
  return (dispatch) => {
    const fields = { title: list.title, content: list.content, tags: list.tags };
    axios.put(`${ROOT_URL}/lists/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch(fetchList(id));
    }).catch(error => {
      dispatch(errorMessage(`Error updating list: ${error.response}`));
    });
  };
}

export function deleteList(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/lists/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({ type: ActionTypes.DELETE_LIST, payload: null });
      browserHistory.push('/');
    }).catch(error => {
      dispatch(errorMessage(`Error deleting list: ${error.response}`));
    });
  };
}

export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}

export function authError(error) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch(errorMessage(error));
  };
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response}`));
    });
  };
}


export function signupUser({ email, password, username }) {
  console.log(email, password, username);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response}`));
    });
  };
}


export function fetchUser() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/profile`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: {
        user: response.data,
      } });
    }).catch(error => {
      console.log(error.response);
    });
  };
}

export function generate(result) {
  return (dispatch) => {
    dispatch({ type: 'RESULT', result: result.pickeditems });
    console.log(result.pickeditems);
  };
}
