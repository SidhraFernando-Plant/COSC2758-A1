import {getAvatar} from "../data/userRepository"
import {createPost, getPosts, getPostsByUser, deletePost, editPost} from "../data/postRepository"
import PostPreview from './PostPreview'
import { useState, useEffect } from "react";
import CollapsibleForm from "./CollapsibleForm";

//props: username (str), 
//Show all posts in descending chronological order to user
function Posts(props) {
    var postText = null;
    const [allPosts, setPosts] = useState(getPosts());

    //Secured page: only allow access if user is logged in
    useEffect(() => {
      if(props.username===null||props.username==="") {
        window.location.href = "/login";
      }
    });

    // Params: textPost (string)  | Return: none
    // make a new post with text textPost, update the state allPosts and clear the input field for making new post
    function makePost(textPost) {
      var today = new Date();
      today = today.toDateString();
      createPost(textPost, props.username, today);
      setPosts(getPosts());
      document.getElementById("reply-input").value = "";
    }

    // delete the post with repository method
    function startDeletePost(postId) {
      deletePost(postId);
      setPosts(getPosts());
    }

    function updatePost(postId, postText) {
      editPost(postId, postText);
      setPosts(getPosts());
    }

    return (
      <div>
        <CollapsibleForm heading="All posts" formTitle="+ New post" txtAreaLabel="Share your thoughts..." handleSubmit={makePost}/>
          {allPosts != null && allPosts.length!=0
          ?
          <div className="d-flex">
            <div className="posts m-auto">
              
              {allPosts.map(function(post){
                return <PostPreview post={post} username={props.username} showReplies={true} avatarUrl={getAvatar(props.username)} handleDelete={startDeletePost} handleUpdate={updatePost}/>;
              })}
            </div>
            </div>
          :
          <p>No posts have been made yet.</p>
          }
          
          </div>
    );
  }
  
export default Posts;