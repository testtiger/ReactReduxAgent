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
                <h3>Add Posts></h3>
                <form action="">
                    <label>Title:</label>
                    <input type="text" name="Title" value={this.state.username} onChange={this.onChange.bind(this)} />
                    <br />
                    <label>Password:</label>
                    <textarea onChange={this.onChange.bind(this)} />
                    <br />
                    <button className="btn btn-primary" onClick={this.login.bind(this)}>
                        submit
          </button>

                </form>
                
            </div>;
        }
    

}
export default PostsForm;