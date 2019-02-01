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
            this.setStat({posts:res});
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
      var element=this.state.posts.map(function(ite){
          return <div>
              <ul key={}></ul>
          </div>
      })
    return (
      <div>
        <h1>posts</h1>
      </div>
    )
  }
}
export default Posts;