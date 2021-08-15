import '../App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header'
import Nav_Bar from './Nav_Bar'
import Home from './Home'
import Footer from './Footer'
import SignUp from './SignUp'
import LogIn from './LogIn'
import MyProfile from './MyProfile'
import { useState } from 'react';
import { getEmail, getUser, removeUser, getDateJoined } from "../data/repository";


function App() {
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [dateJoined, setDateJoined] = useState(getDateJoined());

  const loginUser = (username, email, dateJoined) => {
    setUsername(username);
    setEmail(email);
    setDateJoined(dateJoined);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
    setEmail(null);
    setDateJoined(null);
  }
  
  return (
    <div>
      <Router>
        <Header username={username} logoutUser={logoutUser}/>
        <main role="main">
          <Switch>
            <Route path="/login">
            <Route path="/login" render={props => (
                <LogIn {...props} loginUser={loginUser} />
              )} />
            </Route>
            <Route path="/profile">
              <MyProfile username={username} email={email} dateJoined={dateJoined}/>
            </Route>
            <Route path="/sign-up">
              <SignUp/>
            </Route>
            <Route path="/">
              <Home username={username}/>
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
