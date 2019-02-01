export function getURIList() {
  var prefix = "/ccagentui";
  var version = "/v1/";

  return {
    PROFILES_URI: prefix + version + "profiles/",
    POSTS_URI: prefix + version + "posts/",
    RECENT_ORDERS_URI: prefix + version + "agentReports/recentOrders/",
    AGENT_PENDING_ACTIONS_URI:
      prefix + version + "agentReports/myPendingActions/",
    GET_SKU: prefix + version + "skus/",
    LOGIN: prefix + version + "/login"
  };
}

var prefix = "/ccagentui";
var version = "/v1/";
export const PROFILES_URI = prefix + version + "profiles/";
export const POSTS_URI = prefix + version + "posts/";
export const RECENT_ORDERS_URI =  prefix + version + "agentReports/recentOrders/";
export const AGENT_PENDING_ACTIONS_URI =  prefix + version + "agentReports/myPendingActions/";
export const GET_SKU_URI = prefix + version + "skus/";
export const LOGIN_URI = prefix + version + "/login";
