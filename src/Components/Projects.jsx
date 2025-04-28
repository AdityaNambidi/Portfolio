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
            title: "Strato Lending Chatbot",
            desc: "Integrated an AI-powered chatbot to assist users with firm information, loan rates, and personalized support. Also enabled advanced website context-awareness, allowing dynamic assistance based on user behavior and Built intelligent workflows to guide users through loan applications, proactively addressing drop-offs and form abandonment.",
            img: "./images/projects/stratolending.png",
            tags: ["JavaScript", "HTML", "Python", "FastAPI", "MongoDB", ]
        },
        {
            title: "MathBot",
            desc: "A Math assistance AI that helps students by guiding them to the right answer for any math question. It can solve any math problem given to it, be it algebra, calculus, geometry, etc. It also corrects completed math homework and grades the student's work.",
            img: "./images/projects/mathbot.png",
            tags: ["JavaScript", "HTML", "Python", "Django", "MongoDB", ]
        },
        // {
        //     title: "Dental Clinic Whatsapp Automation",
        //     desc: "A Bot that messages the clinic's aged patients on whatsapp to remind them of their appointments and to take their medicines.",
        //     img: "./images/projects/smartswitch.png",
        //     tags: ["Python", "Selenium", "Twilio", "Django", "MongoDB", ]
        // },
        {
            title: "SmartSwitch",
            desc: "This is a smart home system I am working on called SmartSwitch. Users will be able to control all the switches and electronics in their homes through a website.",
            img: "./images/projects/smartswitch3.png",
            tags: ["Arduino", "C", "Python", "Flask", "HTML & CSS", "JavaScript", ]

        }, {
            title: "Energy demand prediction",
            desc: "In this project I collected historical weather data and electricity consumption data of Delhi from the year's 2017-2024 to train a machine learning model to predict the hourly electricity demand in Delhi to help the power sector prepare for the future electricity need, in order to help reduce power cuts.",
            img: "./images/projects/edemand.png",
            tags: ["AI/ML", "Python", "Sickit-Learn"]
        }, {
            title: "Acne Detection App",
            desc: "This is an ongoing machine learning project I am working on with my team where we're training a model to detect the skin condition one is facing by using CNN's trained with 1000's of labbeled images of skin conditions such as Pustules, White heads, darkspots, etc.",
            img: "./images/projects/acne.png",
            tags: ["Python", "Tensorflow", "Flutter", "AI/ML"]
        }, {
            title: "Hand-written Digit Recognition",
            desc: "Usign and MNSIT hand written digit dataset and CNN I made a model that could detect handwritten digits with an accuracy of 99%.",
            img: "./images/projects/digitrec.png",
            tags: ["Tensorflow", "Python", "Pandas",]
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