import { SET_AUTH_TOKEN } from "./ActionConstants";
import { makeRestcall } from "../Rest/agent-rest-client";
import { LOGIN_URI } from "../Rest/RestConstants";

export function setAuthToken(token, isLoggedIn) {
  return {
    type: SET_AUTH_TOKEN,
    payload: {
      AUTH_TOKEN: "Bearer " + token,
      isLoggedIn: isLoggedIn
    }
  };
}
export function fetchAuthToken(payload) {
  return dispatch => {
    makeRestcall("POST", LOGIN_URI, payload).then(response => {
      console.log(response);
      if (response.access_token) {
        sessionStorage.setItem("token", "Bearer " + response.access_token);
        sessionStorage.setItem("isLoggedin", true);
        dispatch(setAuthToken(response.access_token, true));
      } else {
        alert("Invalid user Name & password");
      }
    });
  };
}
