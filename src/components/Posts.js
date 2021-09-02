import {createPost, getPosts, getPostsByUser, getAvatar} from "../data/repository"
import PostPreview from './PostPreview'
import { useState, useEffect } from "react";

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
        
        
        <div className="d-flex justify-content-between align-items-center posts-heading m-auto">
              <h2>All posts</h2>
                <button className="btn bg-grey white-hover dark-button" type="button" data-toggle="collapse" data-target="#collapseExample" ar aria-expanded="false" aria-controls="collapseExample">
                  + New post
                </button>
              </div>
              <div className="collapse" id="collapseExample">
            <div className="card card-body card-new-post mb-3">
                <div className="form-group">
                    <form id="new-post-form">
                    <label for="exampleFormControlTextarea1">Share your thoughts...</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setPostText(e.target.value)}></textarea>
                    
                    <button type="submit" className="mt-3 btn btn-1 d-inline post-button" data-toggle="collapse" data-target="#collapseExample" ar aria-expanded="false" aria-controls="collapseExample" onClick={e => makePost(postText)}>Submit</button>
                    </form>
                    </div>
                </div>
                
        </div>
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
            {//<div className="ml-5">
              //<h2>My posts</h2>
              //{userPosts != null
              //  ?
              //  userPosts.map(function(post){
              //  return <PostPreview post={post} username={props.username}/>;
              //})
              //  :
              //  <>
              //    <p>You haven't made any posts yet.</p>
              //  </>
              }
            </div>}
          </div>
          
          
      
      
    );
  }
  
export default Posts;