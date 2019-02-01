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
           
           
        }

    }
    render() {
       

            return <div>
                <
                <label>UserName:</label>
                <input type="text" name="username" value={this.state.username} onChange={this.onChange.bind(this)} />
                <br />
                <label>Password:</label>
                <input type="password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} />
                <br />
                <button className="btn btn-primary" onClick={this.login.bind(this)}>
                    submit
          </button>
              
            </div>;
        }
    

}
export default PostsForm;