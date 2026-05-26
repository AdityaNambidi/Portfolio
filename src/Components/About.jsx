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
                        I build AI systems that don't just demo well - they work at scale in production. Most AI projects fail not because the model was wrong, but because the system around it wasn't thought through. I focus on the "glue" - the workflows, the edge cases, and the handoffs - that turn a generic LLM into a high-ROI business asset.

                    <br />
What I bring to your business:

                    <br />
→ Agentic Orchestration: Developing autonomous agents for network management and email parsing (handling 5,000+ monthly volume).<br />
→ RAG Document Intelligence: Architecting custom retrieval systems that make your proprietary data actionable and accurate.<br />
→ Workflow Engineering: Expert-level n8n and LangGraph developer creating self-healing loops and automated SEO pipelines.<br />
→ Recent Milestone: Part of the core dev team for a major Fintech platform launch (April 1,2026). Responsible for the AI-driven data ingestion and real-time analysis layers.
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