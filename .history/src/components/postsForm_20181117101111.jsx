import React, { Component } from 'react';



class PostsForm extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", body: "" };
    }



    onChange(e) {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit(e) {
        e.preventDefault();
        console.log("state is", this.state)

        var req={
            method:"POST",
            body:JSON.stringify(this.state),
            headers:{
                "content-type":"application/json"
            }
        }
        fetch("htpp",req)
        .then(res => res.json())
        .then(res => console.log(res))
        

    }
    render() {
       

            return <div>
                <h3>Add Posts></h3>
                <form >
                    <label>Title:</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.onChange.bind(this)} />
                    <br />
                    <label>Body:</label>
                    <textarea value={this.state.body} name="body" onChange={this.onChange.bind(this)} />
                    <br />
                    <button type="submit" onClick={this.onSubmit.bind(this)}>
                        submit
          </button>

                </form>
                
            </div>;
        }
    

}
export default PostsForm;