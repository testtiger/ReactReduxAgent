export function getURIList() {
    var prefix = "/ccagentui";
    var version = "/v1/";

    return {
        Profile_URI: prefix + version + "profiles/",
        posts: prefix + version + "posts/",
        recentOrders_URI: prefix + version + "agentReports/recentOrders/",
        myPendingActions_URI: prefix + version + "agentReports/myPendingActions/",
        GET_SKU: prefix + version + "skus/",
        LOGIN: prefix + version + "/login"
    };
}