const USERS_KEY = "users";
const USER_KEY = "user";
const EMAIL_KEY = "email";
const DATE_KEY = "dateJoined";
const POST_TEXT_KEY = "text";
const POST_ID_KEY = "postId";
const POSTS_KEY = "posts";
const DEFAULT_AVATAR_PATH = "../img/avatar.svg";

function initUsers() {
    // Stop if data is already initialised.
    if(localStorage.getItem(USERS_KEY) !== null)
      return;
  
    // User data is hard-coded, passwords are in plain-text.
    const users = [
      {
        username: "mbolger",
        password: "abc123"
      },
      {
        username: "shekhar",
        password: "def456"
      },
      {
        username: "a",
        password: "b",
        email: "sidhrafp@gmail.com",
        dateJoined: "2022-07-26"
      }
    ];
  
    // Set data into local storage.
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function verifyUser(username, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    for(const user of users) {
        if(username===user.username && password===user.password) {
            return true;
        }
    }
    return false;
}

function setUser(username, email, date) {
    localStorage.setItem(USER_KEY, username);
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(DATE_KEY, date);
}
  
function getUser() {
    return localStorage.getItem(USER_KEY);
}

function getEmail() {
    return localStorage.getItem(EMAIL_KEY);
}

function getDateJoined() {
  return localStorage.getItem(DATE_KEY);
}

//CHANGE THIS
function getEmailByUsername(username) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
      if(username===user.username) {
          return user.email;
      }
  }
  return null;
}

//CHANGE THIS
function getDateByUsername(username) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
      if(username===user.username) {
          return user.dateJoined;
      }
  }
  return null;
}
  
function removeUser() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(DATE_KEY);
}

function deleteUser(username) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    for(var i=0;i<users.length;i++) {
      if(username===users[i].username) {
        alert("account found at position" + i)
          users.splice(i, i+1);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          return;
      }
    }
}

function editUser(oldUsername, newUsername, email) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(oldUsername===user.username) {
        alert("Account found");
        user.username = newUsername;
        user.email = email;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }
}

function createUser(newUsername, newPassword, newEmail, date) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    const newUser = {username: newUsername, password: newPassword, email: newEmail, dateJoined: date, avatar: ""};
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setAvatar(username, imgBlob) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(username===user.username) {
        user.avatar = imgBlob;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return;
    }
  }
}

function getAvatar(username) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(username===user.username) {
        var imgBlob = user.avatar;
        return imgBlob;
    }
  }
  return "";
}

//----------POSTS--------------

//Maybe put this in a separate file
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
        posts.splice(i, i+1);
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
        return;
    }
  }
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
    setUser,
    getUser,
    removeUser,
    initUsers,
    verifyUser,
    createUser,
    getEmail,
    getEmailByUsername,
    getDateJoined,
    getDateByUsername,
    deleteUser,
    editUser,
    createPost,
    getPosts,
    getPostsByUser,
    deletePost,
    editPost,
    getReplies,
    createReply,
    getPostById,
    setAvatar,
    getAvatar
}

//[{"username":"mbolger","password":"abc123"},{"username":"shekhar","password":"def456"}]