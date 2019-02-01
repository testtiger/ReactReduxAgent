import { SET_AUTH_TOKEN } from "./ActionConstants";
import { makeRestcall } from "../Rest/agent-rest-client";
import { LOGIN_URI } from "../Rest/RestConstants";

export function setAuthToken(token) {
  return {
    type: SET_AUTH_TOKEN,
    payload: {
      AUTH_TOKEN: "Bearer " + token,
      isLoggedIn: true
    }
  };
}
export function loginActionCreator(payload) {

    return (dispatch)=>{

    }
  console.log(" I am in loginAction creatore");
 

  //return
}

function loginActionCreator1(payload) {
  makeRestcall();

  return {
    type: SET_AUTH_TOKEN,
    payload: ""
  };
}
