import React, { Component } from 'react';



class PostsForm extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", isLoggedin: false };
    }



    onChange(e) {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value });
    }
  
    login() {
        

        if (this.state.password && this.state.username) {
            var payload = this.state;
            payload["grant_type"] = "password"

            makeRestcall("POST", "/ccagentui/v1/login", payload).then((response) => {
                console.log(response)
                if (response.access_token) {
                    sessionStorage.setItem("token", "Bearer " + response.access_token);
                    sessionStorage.setItem("isLoggedin", true);
                    this.setState({ isLoggedin: true })
                }
                else {
                    alert("Invalid user Name & password")
                }
            })
        }

    }
    render() {
       

            return <div className="form-group">
                <label>UserName:</label>
                <input className="form-control col-lg-5" required={true} type="text" name="username" value={this.state.username} onChange={this.onChange.bind(this)} />
                <br />
                <label>Password:</label>
                <input className="form-control col-lg-5" required={true} type="password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} />
                <br />
                <button className="btn btn-primary" onClick={this.login.bind(this)}>
                    submit
          </button>
              
            </div>;
        }
    

}
export default PostsForm;