import { Model } from "./Model";


const Rocket = () => {

    return (

        <mesh>
            
            <Model />
            <ambientLight />
            <directionalLight position={[-5,5,5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        </mesh>
    )

}


export default Rocket;