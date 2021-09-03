import {getAvatar} from "../data/userRepository"
import {createPost, getPosts, getPostsByUser} from "../data/postRepository"
import PostPreview from './PostPreview'
import { useState, useEffect } from "react";
import CollapsibleForm from "./CollapsibleForm";

//props: username (str), 
//Show all posts in descending chronological order to user
function Posts(props) {
    var postText = null;

    useEffect(() => {
      if(props.username===null||props.username==="") {
        window.location.href = "/login";
      }
    });
    
    function setPostText(newText) {
        postText = newText;
    }

    function makePost(textPost) {
      var today = new Date();
      today = today.toDateString();
      createPost(textPost, props.username, today);
      setPosts(getPosts());
      document.getElementById("new-post-form").reset()
    }

    const [allPosts, setPosts] = useState(getPosts());

    return (
      <div>
        
        
        
        <CollapsibleForm heading="All posts" formTitle="+ New post" txtAreaLabel="Share your thoughts..." handleSubmit={makePost}/>
                
        
          {allPosts==null
          ?
          <p>No posts have been made yet!!</p>
          :
          <div className="d-flex">
            <div className="posts m-auto">
              
              {allPosts.map(function(post){
                return <PostPreview post={post} username={props.username} showReplies={true} avatarUrl={getAvatar(props.username)}/>;
              })}
            </div>
            </div>}
          </div>
          
          
      
      
    );
  }
  
export default Posts;