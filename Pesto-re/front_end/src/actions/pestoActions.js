import axios from "axios";
import setAuthToken from "../Utils/authHandler";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const pestoPost = (userData, history) => dispatch => {
  axios
    .post("/api/v1/pestos/post", userData)
    .then(res => history.push("/"))
};

export const readPosts = (userData, history) => dispatch => {
  axios
    .post("/api/v1/pestos/display", userData)
    .then(res => history.push("/"))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
};
