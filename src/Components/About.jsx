import Skills from "./Skills";
import "./styles/About.css"
import Reveal from "./Reveal";

function About() {

    return (

        <div id="aboutme" className="about">


            <Reveal>

                <div className="about-title">

                    <h1>About me<span>.</span></h1>
                </div>
            </Reveal>

            <div className="grad"></div>


            <div className="info">

                <Reveal>

                    <h4>I'm <span>Aditya</span></h4>


                    <p>
                        I'm a software developer with over four years of coding experience, specializing in Python, web development, and AI/ML. I create automation solutions, custom SaaS applications, and innovative AI-powered tools like Retrieval-Augmented Generation (RAG) systems. I help businesses streamline operations and leverage AI to achieve their goals. Let's bring your ideas to life!
                    </p>
                    <br />
                </Reveal>

                <div className="container">


                    <Reveal>
                        <div className="awards">

                            <h4><span>Accolades</span></h4>

                            <p>
                                IIU-SATVA Global SDG Project Competition - Best project <br />
                                iOS App Development Challenge - Best App in Education Category  <br />
                                AUS Computing Competition - First place <br />
                            </p>

                        </div>
                    </Reveal>


                    <Reveal>
                        <div className="edu">
                            <h4><span>Education</span></h4>
                            <h5>Abu Dhabi Indian School 23'</h5>
                            <p>High School</p>
                            <h5>Delhi Technological University 27'</h5>
                            <p>Undergrad</p>
                        </div>
                    </Reveal>

                </div>

            </div>

            <Skills />

        </div>

    )

}


export default About;