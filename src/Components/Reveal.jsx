import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion"


function NavReveal ({children}) {


    return (
        <div style={{
            width: "auto",
        }}>

            <motion.div
                variants={{
                    hidden: {opacity: 0, x:-200},
                    visible: {opacity: 1, x:0}
                }}
                initial="hidden"
                animate="visible"
                transition= {{duration: 0.6, delay:0.2}}
            >{children}</motion.div>

        </div>
    )

}

function Reveal ({children}) {

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    const mainControls = useAnimation();

    useEffect(() => {

            if (isInView) {
                
                mainControls.start("visible");
            }
    }, [isInView])

    return (
        <div ref={ref} style={{
            width: "auto",
        }}>

            <motion.div
                variants={{
                    hidden: {opacity: 0, y:75},
                    visible: {opacity: 1, y:0}
                }}
                initial="hidden"
                animate={mainControls}
                transition= {{duration: 0.6, delay:0.2}}
            >{children}</motion.div>

        </div>
    )

}

export default Reveal;
export {NavReveal};