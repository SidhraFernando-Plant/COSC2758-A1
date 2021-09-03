import Carousel from './Carousel'
import Features from './Features';
import Headline from './Headline';

function Home(props) {
    return (
      <div>
          <Headline/>
          <div className="d-flex justify-content-center">
            
            <Carousel/>
            <Features/>
            
        </div>
      </div>
    );
  }
  
export default Home;