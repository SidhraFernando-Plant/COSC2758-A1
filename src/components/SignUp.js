function SignUp() {
    return (
        <div className="sign-up m-auto">
            <h2>Sign up</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Password</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Confirm password"></input>
                </div>
                <button type="submit" class="btn btn-primary m-auto">SUBMIT</button>
            </form>
        </div>
      
    );
  }
  
export default SignUp;