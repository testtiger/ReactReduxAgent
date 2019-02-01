import React from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import LoginPage from "../LoginPage/loginpage";
import DashboardPage from "../Dashboard/DashboardPage";
import Navigation from "../Shared/Navigation";

import { Provider } from "react-redux";

import { createStore } from "redux";
/*import CustomerSearchPage from "../CustomerSearch/CustomerSearchPage";
import Registration from "../CustomerSearch/Registration";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage.jsx";
import Navigation from "../Shared/Navigation";
import CreateOrderPage from "../CreateOrder/CreateOrderPage";
import TODO from "../BugsTODO/TODO";*/

export const Root = ({ store }) => (
  <Provider store={store}>
    <Navigation />
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/welcome" component={DashboardPage} />
      <Route path="*" component={LoginPage} />
    </Switch>
  </Provider>
);
// render={(props) => <Dashboard {...props} isAuthed={true} />}
//<Route exact path="/" component={LoginPage} />
var Routes = function(mystore) {
  console.log("my storre is ----------", mystore);
  return (
    <Provider mystore={mystore}>
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            
            <Route exact path="/" render={(props) => <LoginPage {...props} store={mystore} />
            <Route path="/welcome" component={DashboardPage} />
            <Route path="*" component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;
