import { setUser, verifyUser, initUsers } from "../data/repository";
function LogIn(props) {
    var username = null;
    var password = null;

    function setUsernameInput(newUsername) {
        username = newUsername;
    }

    function setPassword(newPassword) {
        password = newPassword;
    }

    function logIn() {
        if(verifyUser(username, password)) {
            initUsers();
            props.loginUser(username);
            setUser(username);
        // Navigate to the home page.
            props.history.push("/");
            return;
        }
    }
    
    return (
        <div className="sign-up m-auto">
            <h2>Log in</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={e => setUsernameInput(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button onClick={() => {logIn()}} type="submit" class="btn btn-primary m-auto">LOG IN</button>
            </form>
        </div>
      
    );
  }
  
export default LogIn;