import { SET_AUTH_TOKEN } from "./ActionConstants";
import { makeRestcall } from "../Rest/agent-rest-client";
import { LOGIN_URI } from "../Rest/RestConstants";



function loginActionCreator(store,payload){

    makeRestcall("POST", LOGIN_URI, payload).then(response => {
        console.log(response);
        if (response.access_token) {
            sessionStorage.setItem("token", "Bearer " + response.access_token);
            sessionStorage.setItem("isLoggedin", true);
            this.setState({ isLoggedin: true });
            store.dispatch({ 
                type: SET_AUTH_TOKEN,
                payload: { AUTH_TOKEN:, }
            })
        }
        else {
            alert("Invalid user Name & password");
        }
    });

    //return

}

function loginActionCreator1(payload) {

    makeRestcall()

    return {
        type: SET_AUTH_TOKEN,
        payload:
    }

}