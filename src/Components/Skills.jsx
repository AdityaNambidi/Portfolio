import "./styles/Skills.css"
import Reveal from "./Reveal";

function Skills() {

    const skills = [
        { name: 'JavaScript', icon: 'images/logos/js.png' },
        { name: 'LangChain', icon: 'images/logos/langgraph.png' },
        { name: 'Tensorflow', icon: 'images/logos/tensorflow.png' },
        { name: 'Python', icon: 'images/logos/python.png' },
        { name: 'React', icon: 'images/logos/react.png' },
        { name: 'Arduino', icon: 'images/logos/arduino.png' },
        { name: 'n8n', icon: 'images/logos/n8n.png' },
        { name: 'Pytorch', icon: 'images/logos/pytorch.png' }
    ];

    return (

        <div className="skills">

            <div className="skill-box">


                <Reveal>
                    <h1  >Skills<span>.</span> </h1>
                </Reveal>


                    <div className="skill-grid">

                        {skills.map((skill, index) => (
                            <Reveal key={index}>

                                <div className="skill-item">
                                    <img src={skill.icon} alt={skill.name} className="skill-icon" />
                                    <div className="skill-name">{skill.name}</div>
                                </div>
                            </Reveal>

                        ))}

                    </div>


            </div>

        </div>

    )

}

export default Skills;