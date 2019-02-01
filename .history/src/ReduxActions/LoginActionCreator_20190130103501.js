import { SET_AUTH_TOKEN } from "./ActionConstants";
import { makeRestcall } from "../Rest/agent-rest-client";


function loginActionCreator(payload){

    return {
        type:login
    }

}