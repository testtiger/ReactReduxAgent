import { FETCH_RECENT_ORDERS } from "./ActionConstants";
import { makeGetCall } from "../Rest/RestConstants";

function recentOrdersActionCreator() {
  return {
    type: FETCH_RECENT_ORDERS
    //payload:
  };
}
