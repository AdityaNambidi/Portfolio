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
                        As a college student and a <span>self taught</span> programmer, I have worked on multiple projects since the start of high school.<br />With <span>4+ years</span> of experience and knowladge in multiple different languages and frameworks I have worked on projects related<br />to App development, Game development, <span>Robotics</span> and more.
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