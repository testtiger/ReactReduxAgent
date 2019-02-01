
import { FETCH_RECENT_ORDERS } from "./ActionConstants"
import { makeGetCall} from "../Rest/agent-rest-client"

function recentOrdersActionCreator(){

    makeGetCall

    return {
        type: FETCH_RECENT_ORDERS
        payload:
    }

}