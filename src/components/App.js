import '../App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import SignUp from './SignUp'
import LogIn from './LogIn'
import MyProfile from './MyProfile'
import Posts from './Posts'
import PostInspect from './PostInspect'
import { useState } from 'react';
import { getEmail, getUser, removeUser, getDateJoined } from "../data/userRepository";


// props: none | App component with routing
function App() {
  //Store user details in state, and pass to child components as props
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [dateJoined, setDateJoined] = useState(getDateJoined());

  // Params: username (str), email (str), dateJoined (str) | Return: none 
  // upon successful authentication of user credentials, log user in by storing their creds in this component's state
  const loginUser = (username, email, dateJoined) => {
    setUsername(username);
    setEmail(email);
    setDateJoined(dateJoined);
  }

  // Params: none  | Return: none
  // log out the current user by removing them from localStorage and this component's state
  const logoutUser = () => {
    removeUser();
    setUsername(null);
    setEmail(null);
    setDateJoined(null);
  }
  
  return (
    <div className="footer-padding">
      <Router>
        <Header username={username} logoutUser={logoutUser}/>
        <main role="main">
          <Switch>
            <Route path="/signup" render={props => (
              <SignUp {...props} username={username}/>
            )}/>
            <Route path="/login" render={props => (
              <LogIn {...props} loginUser={loginUser} />
              )} />
            
            <Route path="/profile" render={props => (
              <MyProfile {...props} username={username} email={email} dateJoined={dateJoined} logoutUser={logoutUser} loginUser={loginUser}/>
            )} />
            <Route path="/posts">
              <Posts username={username}/>
            </Route>
            
            <Route  path="/view-post/:id">
              <PostInspect username={username}/>
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
