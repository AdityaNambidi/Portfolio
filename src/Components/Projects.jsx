import React, { useState, useEffect } from 'react';
import "./styles/Projects.css"
import "./styles/ProjectCard.css"
import Reveal from "./Reveal";


function ProjectCard({ title, desc, img, tags, isSelected }) {

    return (

        <div className={"project-card " + (isSelected ? "is-selected" : "")}>



            <img src={img} alt={title} />

            <div className="tags">
                {
                    tags.map((tag, i) => (
                        <div key={i} className="tag">{tag}</div>
                    ))
                }
            </div>

            <h3>{title}</h3>
            <p>{desc}</p>

        </div>

    )

}

function Projects() {

    const projs = [
        {
            title: "SmartSwitch",
            desc: "This is a smart home system I am working on called SmartSwitch. Users will be able to control all the switches and electronics in their homes through a website.",
            img: "./images/projects/smartswitch.png",
            tags: ["Arduino", "C", "Python", "Flask", "HTML & CSS", "JavaScript", ]

        }, {
            title: "Armageddon",
            desc: " A game where you play as a space octoupus and your goal is to devour everything. Other plants will send armys and stuff to stop you. It was made for the Major Game Jam with a team lead by me.",
            img: "./images/projects/armageddon.png",
            tags: ["Unity", "C#",]
        }, {
            title: "SeedBot 3000",
            desc: "A robot that can move around, dig a hole in the soil, plant a seed and even water it. Its goal is to reforest etc.",
            img: "./images/projects/seedbot.png",
            tags: ["Arduino", "C", "Fusion 360",]
        }, {
            title: "CookBot",
            desc: "Robot that cooks food using a robotic arm, is what we intended to make. This prototype however only can cook an ommelete. Robotics arm was made using 3D printed parts and servo's.",
            img: "./images/projects/cookbot.png",
            tags: ["Arduino", "C", "Fusion 360",]
        }, {
            title: "TeachAR",
            desc: "This was an AR learning app. It displays models using AR which can help the student learn better in a more fun manner. This project was made for the Abu Dhabi iOS app Development Competetion for which I won first place in the education category.",
            img: "./images/projects/teachar.png",
            tags: ["Swift", "Python", "MySQL","Flask", "Blender"]
        }, 
        {
            title: "Portfolio",
            desc: "A simple project while it may be, I designed and codded this portfolio over a couple of days using javascript, React, and CSS.",
            img: "./images/projects/portfolio.png",
            tags: ["JavaScript", "React", "CSS", "Flask"]
        }, 
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sliderMargin, setSliderMargin] = useState(0);

    const handleNext = () => {
        const prevIndex = selectedIndex;
        if (prevIndex + 1 > projs.length - 1)
            return;

        setSliderMargin(-((prevIndex + 1) * 360));


        setSelectedIndex(selectedIndex + 1);
    };

    const handlePrevious = () => {
        const prevIndex = selectedIndex;
        if (prevIndex - 1 < 0)
            return;

        setSliderMargin(-((prevIndex - 1) * 360));

        setSelectedIndex(selectedIndex - 1);
    };


    return (
        <div id='projects' className="projects">
            <Reveal>

                <h1>Some things <br />I've worked on<span>...</span></h1>
            </Reveal>

            <Reveal>
                <div className="slider"
                    style={
                        {
                            transform: "translateX(" + sliderMargin + "px)"
                        }
                    }
                >

                    {
                        projs.map((proj, i) => (
                            // ProjectCard(proj.title, proj.desc, proj.img, proj.tags, (i===selectedIndex))

                            <ProjectCard
                                key={i}
                                title={proj.title}
                                desc={proj.desc}
                                img={proj.img}
                                tags={proj.tags}
                                isSelected={(i === selectedIndex)}
                            />
                        ))
                    }

                </div>
            </Reveal>

            
            <Reveal>

                <div className="btns">

                    <div className="btn nxt" onClick={handleNext} >{">"}</div>
                    <div className="btn prev" onClick={handlePrevious} >{"<"}</div>
                </div>
            </Reveal>

        </div>
    )


}


export default Projects;   