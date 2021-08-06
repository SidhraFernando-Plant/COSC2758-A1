import logo from '../img/ticks.svg'

function Header() {
    return (
      <div className="d-flex justify-content-between align-items-center p-3">
          <div className="d-flex">
            <img src={logo} className="logo"></img>
            <span className="ml-3 font-weight-bold logo">VibeCheck</span>
          </div>
          <span>My account</span>
      </div>
    );
  }
  
export default Header;