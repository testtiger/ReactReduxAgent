import {
  SET_ANNOUNCEMENTS,
  SET_QUICK_LINKS,
  SET_RECENT_ORDERS,
  SET_PENDING_ACTIONS
} from "./ActionConstants";
import { makeGetCall } from "../Rest/agent-rest-client";
import {
  DASH_BOARD_POSTS_URI,
  DASH_BOARD_RECENT_ORDERS_URI,
  DASH_BOARD_PENDING_ACTIONS_URI
} from "../Rest/RestConstants";

let AUTH_TOKEN = sessionStorage.getItem("token");

function setRecentOrders(recentOrdersList) {
  return {
    type: SET_RECENT_ORDERS,
    payload: {
      recentOrders: recentOrdersList
    }
  };
}

function setPendingActions(pendingActionsList) {
  return {
    type: SET_PENDING_ACTIONS,
    payload: {
      pendingActions: pendingActionsList
    }
  };
}

function setAnnouncements(announcementsList) {
  return {
    type: SET_ANNOUNCEMENTS,
    payload: {
      announcements: announcementsList
    }
  };
}
function setQuickLinks(quickLinksList) {
  return {
    type: SET_QUICK_LINKS,
    payload: {
      quickLinks: quickLinksList
    }
  };
}

export function fetchPosts() {
  return dispatch => {
    var headers = { Authorization: sessionStorage.getItem("token") };
    makeGetCall(DASH_BOARD_POSTS_URI, headers).then(response => {
      console.log("posts are ============>" + response);
      let result = extractPosts(response);
      dispatch(setAnnouncements(result.announcements));
      dispatch(setQuickLinks(result.quickLinks));
    });
  };
}

function extractPosts(resp) {
  var announcementsList = [];
  var quickLinksList = [];
  var forEachCallBack = function(post) {
    if (post.type === "announcementPost" && post.active === true) {
      announcementsList.push(post);
    } else if (post.type === "quickLinkPost" && post.active === true) {
      quickLinksList.push(post);
    }
  };

  if (resp && resp.posts) {
    resp.posts.forEach(forEachCallBack);
  }

  return {
    announcements: announcementsList,
    quickLinks: quickLinksList
  };
}
export function fetchRecentOrders() {
  return dispatch => {
    var headers = { Authorization: sessionStorage.getItem("token") };
    var queryParams = { limit: 5 };
    makeGetCall(DASH_BOARD_RECENT_ORDERS_URI, headers, queryParams).then(
      response => {
        console.log("orders are ============>" + response);
        if (response.recentOrders) {
          dispatch(setRecentOrders(response.recentOrders));
        }
      }
    );
  };
}

export function fetchPendingActions() {
  return dispatch => {
    var headers = { Authorization: sessionStorage.getItem("token") };
    var queryParams = { limit: 5 };
    makeGetCall(DASH_BOARD_PENDING_ACTIONS_URI, headers, queryParams).then(
      response => {
        console.log("pending actions are are ============>" + response);
        if (response.pendingActionItems) {
          dispatch(setPendingActions(response.recentOrders));
        }
      }
    );
  };
}
