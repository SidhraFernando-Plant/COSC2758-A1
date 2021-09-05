import { createUser, userExists } from "../data/userRepository";
import { useState, useEffect } from "react";

//props: username (str)
//Sign up form with validation, allows users to create an account
function SignUp(props) {
    var username = null;
    var email = null;
    var password = null;
    var confirmPassword = null;
    const [errorMessage, setErrorMessage] = useState(null);

    //Secured page: only allow access if user is not logged in
    useEffect(() => {
        if(props.username !== null) {
            alert("You can't sign up because you are already logged in!");
            window.location.href = "/";
        }
      });

    function setName(newUsername) {
        username = newUsername;
    }

    function setEmail(newEmail) {
        email = newEmail;
    }

    function setPassword(newPassword) {
        password = newPassword;
    }

    function setConfirmPassword(newPassword) {
        confirmPassword = newPassword;
    }


    // Validate user inputs, and if all inputs are valid save the new user
    function signUp() {
        var errorMsg = verifyNewUser();
        //If no errors are found
        if(errorMsg===null) {
            var today = new Date();
            today = today.toDateString();
            createUser(username, password, email, today);
            //Navigate to sign in
            props.history.push("/login");
            return;
        }
        else {
            setErrorMessage(errorMsg);
            return;
        }
    }

    // Params: none | Return: errorMsg (str)
    // Validate the input fields and return a relevant error message, or null if no error is found
    function verifyNewUser() {
        var errorMsg = null;
        //Check for blank fields
        if(username===null||email===null||password===null||confirmPassword===null) {
            errorMsg = "Some fields have been left blank, please fill all fields.";
        }
        //Check for confirmPassword matches password
        else if(password!=confirmPassword) {
            errorMsg = "Passwords must match.";
        }
        //Check if password meets required strength
        else if(validatePassword(password)!==null) {
            errorMsg = validatePassword(password);
        }
        //Check that username isn't already taken
        else if(userExists(username)) {
            errorMsg = "Bad luck! That username is taken."
        }
        return errorMsg;
    }
    // Params: inputPassword | Return: errorMsg (str)
    // Check password strength and return relevant error message if not strong enough, otherwise return null
    function validatePassword(inputPassword) {
        var errorMsg = null;
        //Regex to check if password contains special characters
        var regexSpecialChar = /[!#$%&()*?@~]/g;
        //Regex to check if password contains numbers
        var regexNum = /\d+/g;
        if(inputPassword.length<6) {
            errorMsg = "Password must be at least 6 characters long.";
        }
        else if(inputPassword.toLowerCase()==inputPassword||inputPassword.toUpperCase()==inputPassword) {
            errorMsg = "Password must contain upper and lower case letters";
        }
        else if(!(regexNum.test(inputPassword))) {
            errorMsg = "Password must contain at least one number";
        }

        else if(!(regexSpecialChar.test(inputPassword))) {
            errorMsg = "Password must contain at least one of the following special characters: (!#$%&()*?@~)";
        }
        return errorMsg;
    }

    return (
      <div  className="full-height">
        <h2 className="text-center fw-bolder fs-1">Sign up</h2>
        {errorMessage != null && (
          <div className="alert alert-danger form-width m-auto" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="sign-up m-auto rounded-3">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="confirm-password">Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="d-flex">
              <button
                className="btn m-auto white-hover bg-grey dark-button"
                onClick={signUp}
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
        <a href="/login"><p className="text-center text-dark mt-1">Already have an account? Log in here.</p></a>
      </div>
    );
  }
  
export default SignUp;