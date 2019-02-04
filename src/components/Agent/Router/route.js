import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../LoginPage/loginpage";
import DashboardPage from "../Dashboard/DashboardPage";
import Navigation from "../Shared/Navigation";
import OrderDetailsPage from "../OrderDetailsPage/OrderDetailsPage";
import CustomerSearchPage from "../CustomerSearch/CustomerSearchPage";
import Registration from "../CustomerSearch/Registration";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage.jsx";
import CreateOrderPage from "../CreateOrder/CreateOrderPage";

/*import CustomerSearchPage from "../CustomerSearch/CustomerSearchPage";
import Registration from "../CustomerSearch/Registration";
import CustomerProfilePage from "../CustomerProfile/CustomerProfilePage.jsx";
import Navigation from "../Shared/Navigation";
import CreateOrderPage from "../CreateOrder/CreateOrderPage";
import TODO from "../BugsTODO/TODO";*/

// render={(props) => <Dashboard {...props} isAuthed={true} />}
//  <Route exact path="/" component={LoginPage} />
//  render={props => <LoginPage {...props} store={mystore} />}
var Routes = function({ store }) {
  console.log("my storre is ----------", store);
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/welcome" component={DashboardPage} />
          <Route exact path="/customers" component={CustomerSearchPage} />
          <Route
            exact
            path="/customers/registration"
            component={Registration}
          />
          <Route
            exact
            path="/customers/profiles/:id"
            component={CustomerProfilePage}
          />
          <Route
            exact
            path="/createOrder/:profileId"
            component={CreateOrderPage}
          />
          <Route exact path="/orders/:id" component={OrderDetailsPage} />
          <Route path="*" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
