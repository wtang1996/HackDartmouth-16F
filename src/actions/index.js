import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};

// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const ROOT_URL = 'http://hw5-weijia.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090';
const API_KEY = '?key=weijia_tang';

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS, posts: response.data });
    }).catch(error => {
      console.log(`Error fetching all posts: ${error}`);
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then(response => {
      dispatch({ type: ActionTypes.CREATE_POST, payload: { fields } });
      browserHistory.push('/');
    }).catch(error => {
      console.log('Error creating post');
    });
  };
}

export function updatePost(post, id) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then(response => {
      dispatch({ type: ActionTypes.UPDATE_POST, fields, id });
    }).catch(error => {
      console.log('Error updating post');
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POST, post: response.data });
    }).catch(error => {
      console.log('Error fetching post');
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.DELETE_POST, payload: null });
      browserHistory.push('/');
    }).catch(error => {
      console.log('Error deleting post');
    });
  };
}
