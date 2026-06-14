import './App.css';
import { Home } from './Components/Home';
import NavBar from './Components/NavBar';
import About from './Components/About';
import Projects from './Components/Projects';
import Contact from './Components/Contact';

function App() {

    // smoothScroll();

    return (
        <div>            

            <NavBar />

            <div className="sections">

            
                <Home />

                <About />

                <Projects />

                <Contact />

            </div>

        </div>

    );
}

export default App;
