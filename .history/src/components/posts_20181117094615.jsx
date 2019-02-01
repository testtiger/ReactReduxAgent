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
            this.setState({posts:res});
        })
    }
    /**
     * {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
     */
  render() {
      var element=this.state.posts.map(function(post){
          return (
              <ul key={post.id}>
                <li>{post.userId}</li>
                <li>{post.title}</li>
                <li>{post.body}</li>
              </ul>)
            
      })
    return (
      <div>
        <h1>posts</h1>
        <div></div>
      </div>
    )
  }
}
export default Posts;