const USERS_KEY = "users";
const USER_KEY = "user";
const EMAIL_KEY = "email";
const DATE_KEY = "dateJoined";
const POST_TEXT_KEY = "text";
const POST_ID_KEY = "postId";
const POSTS_KEY = "posts";
const DEFAULT_AVATAR_PATH = "../img/avatar.svg";

function createPost(newPost, username, postDate) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var newId = parseInt(localStorage.getItem(POST_ID_KEY));
    var thisPost = {post : newPost, user: username, date: postDate, id: newId, replies:[]};
    posts.unshift(thisPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
    localStorage.setItem(POST_ID_KEY, newId+1);
  }
  
  function getPosts() {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    if(posts.length==0) {
      return null;
    }
    return posts;
  }
  
  function getPostsByUser(user) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    if(posts.length==0) {
      return null;
    }
    var filteredPosts = [];
    for(const post of posts) {
      //alert(post.USER_KEY);
      if(user===post.user) {
          
          filteredPosts.push(post);
      }
    }
    return filteredPosts;
  }
  
  function getPostById(postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    for(const post of posts) {
      if(postId===post.id) {
          return post;
      }
    }
  }
  
  function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    for(var i=0;i<posts.length;i++) {
      if(postId===posts[i].id) {
          posts.splice(i, 1);
          localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
          return;
      }
    }
  }
  
  function deletePostsByUser(username) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var updatedPosts = [];
    for(const post of posts) {
      if(username!==post.user) {
        //replies could be separate function
        var replies = post.replies;
        var newReplies = [];
        for(const reply of replies) {
          if(username!=reply.user) {
            newReplies.push(reply);
          }
        }
        post.replies = newReplies;
        updatedPosts.push(post);
      }
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  }
  
  function updatePostsByUser(oldUsername, newUsername) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    for(const post of posts) {
      if(oldUsername==post.user) {
          post.user = newUsername;
      }
      var replies = post.replies;
      for(const reply of replies) {
        if(oldUsername==reply.user) {
          reply.user = newUsername;
        }
      }
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }
  
  function editPost(postId, newText) {
      const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
      for(const post of posts) {
        if(postId===post.id) {
            post.post=newText;
            localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
            return;
        }
      }
  }
  
  function createReply(newReply, username, replyDate, postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var repliedPost;
    for(const post of posts) {
      if(parseInt(postId)==parseInt(post.id)) {
          //var replies = post.replies;
          var thisReply = {replyText : newReply, user: username, date: replyDate};
          post.replies.unshift(thisReply);
          localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
          return;
      }
    }
  }
  
  function getReplies(postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var repliedPost;
    for(const post of posts) {
      if(postId===post.id) {
          //var replies = post.replies;
          return post.replies;
      }
    }
  }

  export {
    createPost,
    getPosts,
    getPostsByUser,
    deletePost,
    editPost,
    getReplies,
    createReply,
    getPostById,
    deletePostsByUser,
    updatePostsByUser,
}