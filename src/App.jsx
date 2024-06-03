import './App.css';
import { Home } from './Components/Home';
import NavBar from './Components/NavBar';
import Rocket from './Components/Rocket';
import { Canvas } from "@react-three/fiber";
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

                {/* <Canvas camera={{ position: [10,50,50], fov:50 }}>
                    <Rocket />
                </Canvas> */}

                <About />

                <Projects />

                <Contact />

            </div>

        </div>

    );
}

export default App;
