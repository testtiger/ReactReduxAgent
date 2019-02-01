import React, { Component } from 'react';



class PostsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

     */
    render() {
        var element = this.state.posts.map(function (post) {
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
                <div>{element}</div>
            </div>
        )
    }
}
export default Posts;