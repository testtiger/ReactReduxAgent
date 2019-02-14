import React, { Component } from "react";

export class SearchResults extends Component {
  saveProfileAccessed(profileObject, isProfilePageRequested) {
    if (profileObject === undefined) {
      throw TypeError("Check Profile Object value");
    }
    if (this.props.onClickProfileInfo && isProfilePageRequested) {
      this.props.onClickProfileInfo(profileObject.profileDetail.id);
    } else if (this.props.onClickCreateOrderLink) {
      this.props.onClickCreateOrderLink(profileObject.profileDetail.id);
    }
  }
  render() {
    //props.onClickProfileInfo(profileId);

    console.log("hi hello", this.props.resp.profileList);
    if (!this.props.resp.profileList) {
      return null;
    }
    if (this.props.resp.profileList.length === 0) {
      return (
        <div>
          <hr />
          <h5>No Search resutls found for provided criteria...</h5>
        </div>
      );
    }
    return (
      <div className="Container">
        <div className="row">
          <h3>Search Results:</h3>
          <hr />
          <table className=" table table-bordered table-responsive ">
            <TableHeader />

            <TableBody
              onSearchResultClick={this.saveProfileAccessed.bind(this)}
              profilesList={this.props.resp.profileList}
              isAuthenticated={this.props.isAuthenticated}
              onChangeAuthKey={this.props.onChangeAuthKey}
            />
          </table>
        </div>
      </div>
    );
  }
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Zio Code</th>
        <th>Account</th>
        <th>Latest Order</th>
        <th>Orders</th>
        <th>Profile Details</th>
        <th>Authorization</th>
        <th>Cart</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  let authKeytextInput = React.createRef();
  let profilesList = props.profilesList;
  let isAuthenticated = props.isAuthenticated;
  let elementToShow = null;
  let cassClassNameForInfoButton = isAuthenticated === false ? "disabled" : "";
  let cassClassNameForAuthKey = isAuthenticated === false ? "" : "disabled";

  var element = profilesList.map(profile => {
    let orderIDLinkElement = null;
    if (profile.latestOrderId) {
      orderIDLinkElement = (
        <a href={"/orders/" + profile.latestOrderId}>{profile.latestOrderId}</a>
      );
    }

    return (
      <tr key={profile.profileDetail.id}>
        <td>{profile.profileDetail.firstName}</td>
        <td>{profile.profileDetail.lastName}</td>
        <td>{profile.profileDetail.email}</td>
        <td>
          {profile.profileDetail.shippingAddress
            ? profile.profileDetail.shippingAddress.phoneNumber
            : ""}
        </td>
        <td>
          {profile.profileDetail.shippingAddress
            ? profile.profileDetail.shippingAddress.postalCode
            : ""}
        </td>
        <td>
          {profile.profileDetail.parentOrganization
            ? profile.profileDetail.parentOrganization
            : ""}
        </td>
        <td>{orderIDLinkElement}</td>
        <td>{profile.numberOfOrders ? profile.numberOfOrders : 0}</td>
        <td>
          {(function() {
            if (isAuthenticated) {
              return (
                <button
                  onClick={() => {
                    props.onSearchResultClick(profile, true);
                  }}
                >
                  View Profile
                </button>
              );
            } else {
              return <span>Authenticate To View Profile</span>;
            }
          })()}
        </td>
        <td>
          {(function() {
            if (isAuthenticated) {
              return (
                <strong style={{ color: "Green" }}>
                  Authentication success
                </strong>
              );
            } else {
              return (
                <div>
                  <strong>Key: Any Product Name from latest order </strong>
                  <input
                    type="text"
                    placeholder="ProductName"
                    name="Auth"
                    onChange={e => {
                      props.onChangeAuthKey(profile.latestOrderId, e);
                    }}
                  />
                </div>
              );
            }
          })()}
        </td>
        <td>
          <button
            onClick={() => {
              props.onSearchResultClick(profile, false);
            }}
          >
            {profile.hasIncompleteOrder ? "Complete" : "+New"}
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{element}</tbody>;
}

export default SearchResults;
