import Carousel from './Carousel'
import Features from './Features';
import Headline from './Headline';

// props: none | The landing page, to inform users about VibeCheck and provide signup/login links
function Home() {
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