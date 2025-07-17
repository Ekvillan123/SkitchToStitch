// src/components/ThreeModel.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useDesign } from '../contexts/DesignContext';

interface ThreeModelProps {
  width: number;
  height: number;
  view?: 'front' | 'back' | 'left' | 'right' | 'animated';
  enableControls?: boolean;
}

const ThreeModel: React.FC<ThreeModelProps> = ({ width, height, view = 'animated', enableControls = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { garmentColor, stickers } = useDesign();
  const tshirtModelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    console.log("!!! ThreeModel COMPONENT MOUNTED and useEffect is running !!!");
    console.log("Received width:", width, "height:", height);
    console.log("Current garmentColor from context:", garmentColor);
    console.log("Number of stickers from context:", stickers.length);

    if (!mountRef.current) {
      console.log("!!! mountRef.current IS NULL, CANNOT ATTACH RENDERER !!!");
      return;
    }

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // CAMERA
    // INCREASED NEAR AND FAR CLIPPING PLANES for more robust zooming
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 2000); // Changed from 0.1, 1000
    camera.position.set(0, 0, 5);
    console.log("Camera created at", camera.position);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);
    console.log("Renderer appended to mountRef.current");

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // ORBIT CONTROLS
    // Pass renderer.domElement directly, as it's the canvas element
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // You can uncomment and adjust these values if you still find them too fast/slow
    controls.zoomSpeed = 0.8;
    controls.rotateSpeed = 0.8;
    controls.panSpeed = 0.8;

    // *** NEW LOG: Check the DOM element controls are listening to ***
    console.log("OrbitControls initialized. Listening to DOM element:", controls.domElement);

    // GLTF LOADER
    const loader = new GLTFLoader();
    const modelPath = '/models/tshirt_model.glb';
    console.log(`Attempting to load model from: ${modelPath}`);

    loader.load(
      modelPath,
      (gltf) => {
        tshirtModelRef.current = gltf.scene;
        scene.add(tshirtModelRef.current);
        console.log("GLTF Model loaded successfully:", tshirtModelRef.current);

        const box = new THREE.Box3().setFromObject(tshirtModelRef.current);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Adjust model's position so its center is at (0,0,0)
        tshirtModelRef.current.position.x += (tshirtModelRef.current.position.x - center.x);
        tshirtModelRef.current.position.y += (tshirtModelRef.current.position.y - center.y);
        tshirtModelRef.current.position.z += (tshirtModelRef.current.position.z - center.z);
        
        // Calculate optimal camera distance based on model size
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // Add some padding
        camera.position.z = cameraZ;

        // Ensure OrbitControls target is also centered
        controls.target.copy(new THREE.Vector3(0, 0, 0)); // Model is now at (0,0,0) after centering logic
        controls.update();

        console.log("Model bounding box:", size);
        console.log("Model center:", center);
        console.log("Adjusted model position:", tshirtModelRef.current.position);
        console.log("Adjusted camera Z position:", camera.position.z);

        tshirtModelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
            if ((child as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
              ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).color.set(garmentColor);
              ((child as THREE.Mesh).material as THREE.MeshStandardMaterial).needsUpdate = true;
            }
          }
        });
        console.log(`Garment color applied: ${garmentColor}`);
      },
      (xhr: ProgressEvent) => {
        console.log(`Model loading progress: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
      },
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );

    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);
      // It's crucial that controls.update() is called within the animation loop
      // and only if controls are actually enabled for interaction.
      if (enableControls) { // This prop seems to control if interaction is allowed.
        controls.update();
      } else {
        // If controls are NOT enabled for interaction, still allow automatic rotation
        if (tshirtModelRef.current) {
          tshirtModelRef.current.rotation.y += 0.01;
        }
      }
      renderer.render(scene, camera);
    };
    animate();
    console.log("Animation loop started");

    // CLEANUP FUNCTION
    return () => {
      console.log("!!! ThreeModel COMPONENT UNMOUNTING !!!");
      if (mountRef.current) {
        if (renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        console.log("Renderer disposed.");
      }
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          if ((object as THREE.Mesh).geometry) {
            (object as THREE.Mesh).geometry.dispose();
          }
          if (Array.isArray((object as THREE.Mesh).material)) {
            (object as THREE.Mesh).material.forEach(material => material.dispose());
          } else if ((object as THREE.Mesh).material) {
            ((object as THREE.Mesh).material as THREE.Material).dispose();
          }
        }
      });
      scene.clear();
      controls.dispose();
      console.log("Scene and controls disposed.");
    };
  }, [width, height, garmentColor, stickers.length, enableControls]);

  console.log("ThreeModel JSX is rendering...");

  return (
    <div className="relative">
      <div ref={mountRef} className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200" style={{ width: `${width}px`, height: `${height}px` }} />
    </div>
  );
};

export default ThreeModel;