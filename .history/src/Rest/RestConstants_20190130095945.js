export function getURIList() {
    var prefix = "/ccagentui";
    var version = "/v1/";

    return {
        PROFILES_URI: prefix + version + "profiles/",
        POSTS_URI: prefix + version + "posts/",
        RECENT_ORDERS_URI: prefix + version + "agentReports/recentOrders/",
        AGENT_PENDING_ACTIONS_URI: prefix + version + "agentReports/myPendingActions/",
        GET_SKU: prefix + version + "skus/",
        LOGIN: prefix + version + "/login"
    };
}

PROFILES_URI=prefix + version + "profiles/";
    POSTS_URI= prefix + version + "posts/";
        RECENT_ORDERS_URI: prefix + version + "agentReports/recentOrders/";
            AGENT_PENDING_ACTIONS_URI: prefix + version + "agentReports/myPendingActions/";
                GET_SKU: prefix + version + "skus/";
                    LOGIN: prefix + version + "/login";