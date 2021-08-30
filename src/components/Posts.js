import {createPost, getPosts, getPostsByUser, getAvatar} from "../data/repository"
import PostPreview from './PostPreview'

function Posts(props) {
    var postText = null;
    
    function setPostText(newText) {
        postText = newText;
    }

    function makePost(textPost) {
      var today = new Date();
      today = today.toDateString();
      createPost(textPost, props.username, today);
      window.location.reload();
    }

    var allPosts = getPosts();
    var userPosts = getPostsByUser(props.username);

    return (
      <div>
        <h1>Posts</h1>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" ar aria-expanded="false" aria-controls="collapseExample">
            New post
        </button>
        <div className="collapse" id="collapseExample">
            <div className="card card-body card-new-post">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Share your thoughts...</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setPostText(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary d-inline post-button" onClick={() => makePost(postText)}>Submit</button>
                </div>
                
        </div>
        
          {allPosts==null
          ?
          <p>No posts have been made yet!!</p>
          :
          <div className="d-flex">
            <div className="posts">
              <h2>All posts</h2>
              {allPosts.map(function(post){
                return <PostPreview post={post} username={props.username} avatarUrl={getAvatar(props.username)}/>;
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