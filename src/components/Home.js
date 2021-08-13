import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Slide1 from '../img/slide1.jpg'
import Slide2 from '../img/slide2.jpg'
import Slide3 from '../img/slide3.jpg'
import Book from '../img/book.svg'
import Chat from '../img/chat.svg'
import People from '../img/people.svg'
import Post from '../img/post.svg'

function Home() {
    return (
      <div>
        
          <div className="jumbotron">
            <h1 className="display-4">Stay connected with VibeCheck</h1>
            <p className="lead">Feeling disconnected because of online study and lockdowns?</p>
            <hr className="my-4"></hr>
            <p>VibeCheck makes connecting with fellow students and building communities online easy and fun!</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="/sign-up" role="button">Sign up</a>
            </p>
          </div>
          <div className="d-flex">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={Slide1}></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={Slide2}></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={Slide3}></img>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>

          </div>

          <div className="d-flex flex-column features justify-content-around">
            <div className="d-flex">
              <img src={Book}></img>
              <span>Ask questions about your studies</span>
            </div>
            <div className="d-flex-inline">
              <img src={Chat}></img>
              <span>Discuss subjects with fellow students</span>
            </div>
            <div className="d-flex-inline">
              <img src={Post}></img>
              <span>Make posts and reply to others' posts</span>
            </div>
            <div className="d-flex-inline">
              <img src={People}></img>
              <span>Connect with your peers</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
  
export default Home;