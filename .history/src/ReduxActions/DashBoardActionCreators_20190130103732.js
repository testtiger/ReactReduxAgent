import { FETCH_RECENT_ORDERS } from "./ActionConstants";
import { makeGetCall } from "../Rest/agent-rest-client";

function recentOrdersActionCreator() {
  return {
    type: FETCH_RECENT_ORDERS
    //payload:
  };
}
