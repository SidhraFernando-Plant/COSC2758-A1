import { setUser, verifyUser, getEmailByUsername, getDateByUsername } from "../data/userRepository";
import { useState } from "react";

//props: username (str), history 
//Log in form with authentication functions
function LogIn(props) {
    var username = null;
    var password = null;
    const [errorMessage, setErrorMessage] = useState(null);

    // Params: newUsername (string)  | Return: none
    // when input newUsername is entered into username field, update username
    function setUsernameInput(newUsername) {
        username = newUsername;
    }

    // Params: newPassword (string)  | Return: none
    // when input newPassword is entered into textarea field, update password
    function setPassword(newPassword) {
        password = newPassword;
    }


    // authenticate a user's credentials, if successful log in the user
    function logIn() {
        if(verifyUser(username, password)) {
            var email = getEmailByUsername(username);
            var date = getDateByUsername(username);
            //Store user information
            props.loginUser(username, email, date);
            setUser(username, email, date);
            // Navigate to profile upon successful login
            props.history.push("/profile");
            return;
        }
        else {
            setErrorMessage("Invalid login");
            return;
        }
    }
    
    return (
      <div>
        <h2 className="text-center">Log in</h2>
        {errorMessage != null && (
          <div
            className="alert alert-danger form-width m-auto animated fadeInanimated fadeIn"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <div className="sign-up m-auto rounded-3">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={(e) => setUsernameInput(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button
              onClick={() => {
                logIn();
              }}
              type="reset"
              class="btn bg-grey white-hover dark-button"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    );
  }
  
export default LogIn;