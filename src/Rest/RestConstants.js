var prefix = "/ccagentui";
var version = "/v1/";

var AdminPrefix = "/ccadminui";

export const MFA_LOGIN = AdminPrefix + version + "mfalogin";
export const ADMIN_ROLES_URI = AdminPrefix + version + "adminProfiles/";

export const PROFILES_URI = prefix + version + "profiles/";

export const DASH_BOARD_POSTS_URI = prefix + version + "posts/";
export const DASH_BOARD_RECENT_ORDERS_URI =
  prefix + version + "agentReports/recentOrders/";
export const DASH_BOARD_PENDING_ACTIONS_URI =
  prefix + version + "agentReports/myPendingActions/";

export const SKU_S_URI = prefix + version + "skus/";
export const LOGIN_URI = prefix + version + "login";

export const HISTORY = prefix + version + "orders/";
export const ORDER_SEARCH_URI = prefix + version + "orders";
export const RETURNS_SEARCH_URI = prefix + version + "returnRequests";
export const RETURNS_GET_URI = prefix + version + "returnRequests/";
export const ORDERS_URI = prefix + version + "orders/";
export const ADMIN_AUTH_PAYLOAD = {
  username: "admin",
  password: "admin",
  totp_code: "123456",
  grant_type: "password"
};

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
