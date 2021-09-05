import {getAvatar} from "../data/userRepository"
import {createPost, getPosts, getPostsByUser, deletePost, editPost} from "../data/postRepository"
import PostPreview from './PostPreview'
import { useState, useEffect } from "react";
import CollapsibleForm from "./CollapsibleForm";

//props: username (str), 
//Show all posts in descending chronological order to user
function Posts(props) {
    var postText = null;
    const [posts, setPosts] = useState(getPosts());
    const [isUserPosts, setIsUserPosts] = useState(false);

    //Secured page: only allow access if user is logged in
    useEffect(() => {
      if(props.username===null||props.username==="") {
        window.location.href = "/login";
      }
    });

    // Params: textPost (string)  | Return: none
    // make a new post with text textPost, update the state posts and clear the input field for making new post
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

    //save edits made to post by saving postText as the new text for the post
    function updatePost(postId, postText) {
      editPost(postId, postText);
      setPosts(getPosts());
    }

    //toggle from viewing all posts to only current user's posts
    function togglePosts() {
      //if currently viewing all posts, change state posts to only user's posts
      if(!isUserPosts) {
        setPosts(getPostsByUser(props.username));
      }
      else {
        setPosts(getPosts);
      }
      //update state to reflect change in posts being viewed
      setIsUserPosts(!isUserPosts);
    }

    return (
      <div  className="full-height">
        <CollapsibleForm heading="Forum" formTitle="+ New post" txtAreaLabel="Share your thoughts..." handleSubmit={makePost}/>
        <div className="form-check card-new-post mb-3">
          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={togglePosts}></input>
          <label className="form-check-label" for="defaultCheck1">
            Show only my posts
          </label>
        </div>
          {posts != null && posts.length!=0
          ?
          <div className="d-flex">
            <div className="posts m-auto">
              
              {posts.map(function(post){
                return <PostPreview post={post} username={props.username} showReplies={true} avatarUrl={getAvatar(props.username)} handleDelete={startDeletePost} handleUpdate={updatePost}/>;
              })}
            </div>
            </div>
          :
          <p className="posts m-auto">{isUserPosts ? "You haven't made any posts yet." : "No posts have been made yet."}</p>
          }
          
          </div>
    );
  }
  
export default Posts;