const USERS_KEY = "users";
const USER_KEY = "user";

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
        password: "b"
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

function setUser(username) {
    localStorage.setItem(USER_KEY, username);
}
  
function getUser() {
return localStorage.getItem(USER_KEY);
}
  
function removeUser() {
localStorage.removeItem(USER_KEY);
}

export {
    setUser,
    getUser,
    removeUser,
    initUsers,
    verifyUser
}

//[{"username":"mbolger","password":"abc123"},{"username":"shekhar","password":"def456"}]