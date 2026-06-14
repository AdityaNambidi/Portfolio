import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './styles/ContactShader.css';

// Adapted shader — tinted toward the accent (lime-green) palette.
// Used as a subtle decorative background in the contact section.
const VERTEX = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time * 0.04;
    float lw = 0.0025;

    // Accent hue: lime (205/255, 251/255, 91/255)
    vec3 accent = vec3(0.804, 0.984, 0.357);

    vec3 color = vec3(0.0);
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float ring = lw * (fi * fi) / abs(fract(t + fi * 0.013) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.22));
      color += ring * accent;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ContactShader() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geo = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX, fragmentShader: FRAGMENT });
    scene.add(new THREE.Mesh(geo, mat));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      uniforms.time.value += 0.04;
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, geo, mat, rafId };

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="contact-shader" aria-hidden="true" />;
}
