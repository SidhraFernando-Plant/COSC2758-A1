import '../App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header'
import Nav_Bar from './Nav_Bar'
import Home from './Home'
import Footer from './Footer'
import SignUp from './SignUp'
import LogIn from './LogIn'


function App() {
  return (
    <div>
      <Router>
        <Header />
        <main role="main">
          <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
