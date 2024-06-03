import React, { useEffect, useState } from 'react';
import "./styles/Home.css";
import Reveal from "./Reveal"

export const Home = () => {


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 80) {
                setScrolled(true);
            }
            else
                setScrolled(false);


        };

        

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);

    })


    return (
        <section className="banner" id='home'>

            <div className="container">


                <div className="txt">


                    <Reveal>
                        <div className="tagline">
                            Welcome to my Portfolio.
                        </div>
                    </Reveal>

                    <Reveal>
                        <h1>
                            Hi! I'm Aditya<span>.</span>
                        </h1>
                    </Reveal>

                    <Reveal>
                        <h4>I'm a <span>Software Developer</span></h4>
                    </Reveal>

                    <Reveal>
                        <p>
                            I'm a college student and a full stack developer with experience in web<br />
                            development, game development and robotics.
                        </p>
                    </Reveal>



                </div>

                <div className="home-grid">
                    {
                       (() => {
                            const elements = [];
                            for (let i = 0; i < 625; i++) {
                                elements.push(<div className='dot' key={i}></div>);
                            }
                            return elements;
                        })()
                    }
                </div>


                {/* <div className="image"></div> */}
                <a href="#aboutme">
                <span className={scrolled ? "material-symbols-outlined hide" : "material-symbols-outlined"}>
                    expand_circle_down
                </span>
                </a>

            </div>

        </section>
    )

}