import { createUser } from "../data/repository";
function SignUp() {
    var username = null;
    var email = null;
    var password = null;
    var confirmPassword = null;

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

    function signUp() {
        //e.preventDefault();
        if(username!==null&&email!==null&&password!==null&&confirmPassword!==null) {
            createUser(username, password);
        }
        else {
            alert("Fields empty")
            return;
        }
    }
    return (
        <div className="sign-up m-auto">
            <h2>Sign up</h2>
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
                <button type="submit" class="btn btn-primary m-auto" onClick={signUp}>SIGN UP</button>
            </form>
        </div>
      
    );
  }
  
export default SignUp;