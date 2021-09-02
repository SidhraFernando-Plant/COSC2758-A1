import { setUser, verifyUser, initUsers, getEmailByUsername, getDateByUsername } from "../data/repository";
import { useState } from "react";
function LogIn(props) {
    var username = null;
    var password = null;
    const [errorMessage, setErrorMessage] = useState(null);

    function setUsernameInput(newUsername) {
        username = newUsername;
    }

    function setPassword(newPassword) {
        password = newPassword;
    }

    function logIn() {
        initUsers();
        if(verifyUser(username, password)) {
            var email = getEmailByUsername(username);
            var date = getDateByUsername(username);
            props.loginUser(username, email, date);
            setUser(username, email, date);
        // Navigate to the home page.
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
        {errorMessage!=null &&

            <div className="alert alert-danger form-width m-auto" role="alert">
                {errorMessage}
            </div>
        }

        <div className="sign-up m-auto rounded-3">
            
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={e => setUsernameInput(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button onClick={() => {logIn()}} type="reset" class="btn bg-grey white-hover dark-button">LOG IN</button>
            </form>
        </div>
        </div>
      
    );
  }
  
export default LogIn;