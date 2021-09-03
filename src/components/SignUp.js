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
        if(username!==null&&email!==null&&password!==null&&confirmPassword!==null) {
            var today = new Date();
            today = today.toDateString();
            createUser(username, password, email, today);
            //Navigate to sign in
            props.history.push("/login");
            return;
        }
        else {
            setErrorMessage("Empty Fields");
            return;
        }
    }

    function verifyNewUser() {
        var errorMsg = null;
        if(username!==null&&email!==null&&password!==null&&confirmPassword!==null) {
            errorMsg = "Some fields have been left blank, please fill all fields.";
        }
        else if(password!=confirmPassword) {
            errorMsg = "Passwords must match.";
        }
        else if(validatePassword(password)) {
            errorMsg = "Passwords must match.";
        }
        else if(userExists(username)) {
            errorMsg = "Bad luck! That username is taken."
        }
    }

    function validatePassword(inputPassword) {
        var errorMsg = null;
        var regexSpecialChar = /[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g;
        var regexNum = /\d+/g;
        if(inputPassword.length<6) {
            errorMsg = "Password must be at least 6 characters long.";
        }
        else if(inputPassword.toLowerCase()==inputPassword||inputPassword.toUpperCase()==inputPassword) {
            errorMsg = "Password must contain upper and lower case letters";
        }
        else if(!(regexNum.test(inputPassword))) {
            alert("no numbers");
            errorMsg = "Password must contain at least one number";
        }

        else if(!(regexSpecialChar.test(inputPassword))) {
            alert("no special char");
            errorMsg = "Password must contain at least one punctuation/special character";
        }
    }

    return (
        <div>
            <h2 className="text-center fw-bolder fs-1">Sign up</h2>
            {errorMessage!=null &&
                <div className="alert alert-danger form-width m-auto" role="alert">
                    {errorMessage}
                </div>
            }
        <div className="sign-up m-auto rounded-3">
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Password</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <button type="reset" className="btn m-auto white-hover bg-grey dark-button" onClick={signUp}>SIGN UP</button>
            </form>
        </div>
        </div>
      
    );
  }
  
export default SignUp;