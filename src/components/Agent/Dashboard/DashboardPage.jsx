import React, { Component } from "react";
import QuickLinks from "./quicklinks";
import Announcements from "./announcements.jsx";
import RecentOrders from "./recentorders";
import PendingActions from "./pendingactions";
import { makeGetCall } from "../../../Rest/agent-rest-client";
import LoginPage from "../LoginPage/loginpage";

import { connect } from "react-redux";
import {
  fetchPosts,
  fetchPendingActions,
  fetchRecentOrders
} from "../../../ReduxActions/DashBoardActionCreators";
import { Redirect } from "react-router-dom";

export default class DashboardPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchRecentOrders());
    this.props.dispatch(fetchPendingActions());
  }
  render() {
    let store = this.props.store;
    console.log("inside dashboard renders", store);
    let dashBoard = store.DASH_BOARD;
    console.log("inside dashboard state", dashBoard);
    let announcementsList = dashBoard.announcements; //this.state.quicklinks;
    let qucikLinksList = dashBoard.quickLinks; //this.state.announcements;
    let recentOrdersList = dashBoard.recentOrders; //this.state.recentOrders;
    let pendingActionsList = dashBoard.pendingActions;
    //this.state.pendingActionItems;

    if (store.LOGIN.isLoggedIn) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-8" />
            <div className="col-sm-4">
              <Announcements announcements={announcementsList} />
              <QuickLinks qucikLinks={qucikLinksList} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <RecentOrders recentOrders={recentOrdersList} />
            </div>
            <div className="col-sm-6">
              <PendingActions pendingActions={pendingActionsList} />
            </div>
          </div>
        </div>
      );
    } else {
      return <LoginPage />;
    }
  }
}
const mapStateToProps = function(state) {
  return { store: state };
};

DashboardPage = connect(mapStateToProps)(DashboardPage);
