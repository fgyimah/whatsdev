import API from "../../utils/api";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

//add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  API.post("/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  API.get("/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  API.get(`/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//delete post
export const deletePost = id => dispatch => {
  API.delete(`/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add like
export const addLike = id => dispatch => {
  API.post(`/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//remove like
export const removeLike = id => dispatch => {
  API.post(`/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add coment
export const addComment = (postID, commentData) => dispatch => {
  dispatch(clearErrors());
  API.post(`/posts/comment/${postID}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete comment
export const deleteComment = (postID, commentID) => dispatch => {
  API.delete(`/posts/comment/${postID}/${commentID}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
