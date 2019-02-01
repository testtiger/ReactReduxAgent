import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../LoginPage/loginpage";
import DashboardPage from "../Dashboard/DashboardPage";
import Navigation from "../Shared/Navigation";
import { loginReducer} from "../../Reducers/DashBoardReducers"

/*import CustomerSearchPage from "../CustomerSearch/CustomerSearchPage";
import Registration from "../CustomerSearch/Registration";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage.jsx";
import Navigation from "../Shared/Navigation";
import CreateOrderPage from "../CreateOrder/CreateOrderPage";
import TODO from "../BugsTODO/TODO";*/

import {createStore} from "redux";

var store = createStore(loginReducer)


var Routes = function() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/welcome" component={DashboardPage} />
          <Route path="*" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
