import "./styles/Skills.css"
import Reveal from "./Reveal";

function Skills() {

    const skills = [
        { name: 'JavaScript', icon: 'images/logos/js.png' },
        { name: 'HTML', icon: 'images/logos/html.png' },
        { name: 'CSS', icon: 'images/logos/css.png' },
        { name: 'Python', icon: 'images/logos/python.png' },
        { name: 'React', icon: 'images/logos/react.png' },
        { name: 'Arduino', icon: 'images/logos/arduino.png' },
        { name: 'Unity', icon: 'images/logos/unity.png' },
        { name: 'C#', icon: 'images/logos/csh.png' }
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