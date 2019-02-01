import React, { Component } from 'react';



 class Posts extends Component {

    componentWillMount(){
        fetch("https://jsonplaceholder.typicode.com/posts").then(resu)
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