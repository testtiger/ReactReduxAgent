import React, { Component } from 'react';



 class Posts extends Component {
     constructor(props){
         super(props);
         this.state={
             posts:[]
         }
     }

    componentWillMount(){
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(res =>{
            console.log(res);
            this.setState({posts:res);
        })
    }
  render() {
    return (
      <div>
        <h1>posts</h1>
      </div>
    )
  }
}
export default Posts;