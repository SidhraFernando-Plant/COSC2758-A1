import logo from '../img/ticks.svg'

function Header() {
    return (
      <div className="d-flex justify-content-between align-items-center p-3">
          <a className="ml-3 text-decoration-none" href="/">
            <div className="d-flex">
              <img src={logo} className="logo"></img>
              <span className="ml-3 font-weight-bold logo">VibeCheck</span>
            </div>
          </a>
          <div>
            <a href="/login"><button type="button" class="btn btn-outline-primary">Log in</button></a>
            <a className="ml-3" href="/sign-up"><button type="button" class="btn btn-primary">Sign up</button></a>
          </div>
      </div>
    );
  }
  
export default Header;