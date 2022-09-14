import { createUseStyles } from "react-jss";
import { secondSectionStyles } from "./AboutPageStyle";
import { Canvas, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import Floor from "./Floor";
const useStyles = createUseStyles(secondSectionStyles);
import LightBulb from "./LightBulb";
import Box from "./Box";
import Controls from "./Control";
import Draggable from "./Draggable";

import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = () => {
  // location of the 3D model
  const gltf = useLoader(GLTFLoader, "/earth/scene.gltf");
  return (
    <>
      {/* Use scale to control the size of the 3D model */}
      <primitive object={gltf.scene} scale={0.01} />
    </>
  );
};

function SectionSection() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        {/* <ambientLight intensity={0.7} /> */}
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <Model />
          {/* To add environment effect to the model */}
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          maxDistance={5}
          minDistance={2}
        />
      </Canvas>
    </div>
  );
}

export default SectionSection;
