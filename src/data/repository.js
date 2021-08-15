const USERS_KEY = "users";
const USER_KEY = "user";
const EMAIL_KEY = "email";
const DATE_KEY = "dateJoined";

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

function createUser(newUsername, newPassword, newEmail, date) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    const newUser = {username: newUsername, password: newPassword, email: newEmail, dateJoined: date};
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
    deleteUser
}

//[{"username":"mbolger","password":"abc123"},{"username":"shekhar","password":"def456"}]