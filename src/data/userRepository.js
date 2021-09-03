const USERS_KEY = "users";
const USER_KEY = "user";
const EMAIL_KEY = "email";
const DATE_KEY = "dateJoined";
const POST_TEXT_KEY = "text";
const POST_ID_KEY = "postId";
const POSTS_KEY = "posts";
const DEFAULT_AVATAR_PATH = "../img/avatar.svg";

function initLocalStorage() {
    // Stop if data is already initialised.
    if(localStorage.getItem(USERS_KEY) !== null)
      return;
  
    // User data is hard-coded, passwords are in plain-text.
    const users = [
      {
        username: "Alex123",
        password: "abc123!"
      }
    ];

    const posts = [
      {
        date: "Fri Sep 03 2021",
        id: 1,
        post: "Hey guys!! This is my first post, I am so excited to have joined VibeCheck. With online learning since the start of my degree, I have been finding it quite hard to meet friends :( If you're in the same boat reply with your Instagram username and I'll follow you!",
        replies: [
          {
            replyText: "My instagram is @angus, look forward to meeting you Alex!",
            user: "Angus S",
            date: "Fri Sep 03 2021",
          }
        ],
        user: "Alex123"
      },
      {
        date: "Thu Sep 02 2021",
        id: 1,
        post: "I can't wait until we get out of lockdown and can go on campus!! Do you guys have any good recommendations for places to eat near uni?? I love bubble tea and pizza",
        replies: [
          {}
        ],
        user: "Katie_H"
      }
    ];
  
    // Set data into local storage.
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
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

function userExists(username) {
  var returnVal = false;
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(username===user.username) {
        returnVal = true;
    }
  }
  return returnVal;
}

//----------POSTS--------------

//Maybe put this in a separate file


export {
    setUser,
    getUser,
    removeUser,
    initLocalStorage,
    verifyUser,
    createUser,
    getEmail,
    getEmailByUsername,
    getDateJoined,
    getDateByUsername,
    deleteUser,
    editUser,
    userExists,
    setAvatar,
    getAvatar,
}

//[{"username":"mbolger","password":"abc123"},{"username":"shekhar","password":"def456"}]