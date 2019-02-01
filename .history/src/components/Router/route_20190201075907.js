import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../LoginPage/loginpage";
import DashboardPage from "../Dashboard/DashboardPage";
import Navigation from "../Shared/Navigation";

import { Provider } from "react-redux";

/*import CustomerSearchPage from "../CustomerSearch/CustomerSearchPage";
import Registration from "../CustomerSearch/Registration";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage.jsx";
import Navigation from "../Shared/Navigation";
import CreateOrderPage from "../CreateOrder/CreateOrderPage";
import TODO from "../BugsTODO/TODO";*/


// render={(props) => <Dashboard {...props} isAuthed={true} />}
//  <Route exact path="/" component={LoginPage} />
// 
var Routes = function(mystore) {
  console.log("my storre is ----------",this.props.mystore);
  return <Provider mystore={mystore}>
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" render={(props) => <LoginPage {...props} store={mystore} />} />
            <Route path="/welcome" component={DashboardPage} />
            <Route path="*" component={LoginPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>;
};

export default Routes;
