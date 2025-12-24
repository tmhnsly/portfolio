// src/sections/PatternStorySection/PatternStorySection.tsx
"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMotionValueEvent, useScroll } from "motion/react";

import s from "./PatternStorySection.module.scss";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Chapter = { kicker: string; title: string; body: string };

const CHAPTERS: Chapter[] = [
  {
    kicker: "The spark",
    title: "Start with one clear idea",
    body: "A simple goal beats a complicated brief. We define the outcome before we touch code.",
  },
  {
    kicker: "Collaboration",
    title: "Add the right inputs",
    body: "Constraints, feedback, and iteration turn the idea into something buildable and valuable.",
  },
  {
    kicker: "Structure",
    title: "Connect it into a system",
    body: "We shape those inputs into a coherent approach: design, components, and implementation.",
  },
  {
    kicker: "Craft",
    title: "Ship a finished product",
    body: "The messy network resolves into a clean structure: polished UI, performance, and reliability.",
  },
];

const DOT_COUNT = 10;
const COLORS = [
  "#007AFF",
  "#FF9500",
  "#34C759",
  "#FF3B30",
  "#AF52DE",
  "#5AC8FA",
];

type Dot = {
  networkPos: THREE.Vector3;
  trianglePos: THREE.Vector3;
  color: THREE.Color;
  radius: number;
};

function createPerfectTriangle(): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const s = 0.78;

  positions.push(new THREE.Vector3(0, s * 1.55, 0.28));

  positions.push(new THREE.Vector3(-s * 0.55, s * 0.55, 0.14));
  positions.push(new THREE.Vector3(s * 0.55, s * 0.55, 0.14));

  positions.push(new THREE.Vector3(-s * 1.05, -s * 0.45, -0.02));
  positions.push(new THREE.Vector3(0, -s * 0.45, -0.02));
  positions.push(new THREE.Vector3(s * 1.05, -s * 0.45, -0.02));

  positions.push(new THREE.Vector3(-s * 1.55, -s * 1.45, -0.22));
  positions.push(new THREE.Vector3(-s * 0.55, -s * 1.45, -0.22));
  positions.push(new THREE.Vector3(s * 0.55, -s * 1.45, -0.22));
  positions.push(new THREE.Vector3(s * 1.55, -s * 1.45, -0.22));

  return positions;
}

function createDots(): Dot[] {
  const tri = createPerfectTriangle();
  const dots: Dot[] = [];

  dots.push({
    networkPos: new THREE.Vector3(0, 0, 1.25),
    trianglePos: tri[0].clone(),
    color: new THREE.Color("#141518"),
    radius: 0.085,
  });

  for (let i = 1; i < DOT_COUNT; i++) {
    const angle = i * 0.618 * Math.PI * 2;
    const r = 1.65 + (i % 3) * 0.48;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r * 0.76;
    const z = -1.05 - (i % 4) * 0.62;

    dots.push({
      networkPos: new THREE.Vector3(x, y, z),
      trianglePos: tri[i].clone(),
      color: new THREE.Color(COLORS[i % COLORS.length]),
      radius: 0.105,
    });
  }

  return dots;
}

type Edge = [number, number];

function calculateEdges(dots: Dot[], isTriangle: boolean): Edge[] {
  const edges: Set<string> = new Set();

  if (!isTriangle) {
    for (let i = 1; i < dots.length; i++) edges.add(`0-${i}`);

    for (let i = 1; i < dots.length; i++) {
      const neighbors: Array<{ idx: number; dist: number }> = [];
      for (let j = 1; j < dots.length; j++) {
        if (i === j) continue;
        neighbors.push({
          idx: j,
          dist: dots[i].networkPos.distanceToSquared(dots[j].networkPos),
        });
      }
      neighbors.sort((a, b) => a.dist - b.dist);
      if (neighbors[0]) {
        const a = Math.min(i, neighbors[0].idx);
        const b = Math.max(i, neighbors[0].idx);
        edges.add(`${a}-${b}`);
      }
    }
  } else {
    edges.add("0-1");
    edges.add("0-2");

    edges.add("1-3");
    edges.add("1-4");
    edges.add("2-4");
    edges.add("2-5");

    edges.add("3-6");
    edges.add("3-7");
    edges.add("4-7");
    edges.add("4-8");
    edges.add("5-8");
    edges.add("5-9");

    edges.add("1-2");
    edges.add("3-4");
    edges.add("4-5");
    edges.add("6-7");
    edges.add("7-8");
    edges.add("8-9");
  }

  return Array.from(edges).map((k) => {
    const [a, b] = k.split("-").map(Number);
    return [a, b];
  });
}

function createDotMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    depthWrite: true,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 0 },
      uFogNear: { value: 3.0 },
      uFogFar: { value: 13.5 },
      uFogColor: { value: new THREE.Color(0x07080a) },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aInstanceColor;

      varying vec3 vColor;
      varying vec3 vWorldPos;
      varying vec3 vNormalW;

      void main() {
        vColor = aInstanceColor;

        vec4 worldPos = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vNormalW = normalize(mat3(modelMatrix * instanceMatrix) * normal);

        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying vec3 vWorldPos;
      varying vec3 vNormalW;

      uniform float uTime;
      uniform float uFade;
      uniform float uFogNear;
      uniform float uFogFar;
      uniform vec3 uFogColor;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 34.345);
        return fract(p.x * p.y);
      }

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);

        float rim = pow(1.0 - max(dot(vNormalW, viewDir), 0.0), 2.35);
        float top = smoothstep(-1.3, 1.3, vWorldPos.y);

        vec3 base = vColor;
        vec3 lifted = mix(base, vec3(1.0), 0.14 * top);
        vec3 shaded = mix(lifted, vec3(0.0), 0.10);

        vec3 rimCol = mix(vec3(1.0), base, 0.68);
        vec3 col = shaded + rim * 0.28 * rimCol;

        float d = distance(cameraPosition, vWorldPos);
        float fog = smoothstep(uFogNear, uFogFar, d);
        col = mix(col, uFogColor, fog * 0.92);

        col = mix(uFogColor, col, uFade);

        float n = hash(gl_FragCoord.xy + uTime * 9.0);
        col += (n - 0.5) * 0.03;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

function AtomsScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const { invalidate } = useThree();

  const dots = React.useMemo(() => createDots(), []);
  const networkEdges = React.useMemo(() => calculateEdges(dots, false), [dots]);
  const triangleEdges = React.useMemo(() => calculateEdges(dots, true), [dots]);

  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);

  const geoRef = React.useRef<THREE.IcosahedronGeometry | null>(null);
  const matRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const lineGeoRef = React.useRef<THREE.BufferGeometry | null>(null);
  const lineMatRef = React.useRef<THREE.LineBasicMaterial | null>(null);

  const matrixRef = React.useRef(new THREE.Matrix4());
  const scaleRef = React.useRef(new THREE.Vector3());
  const quatRef = React.useRef(new THREE.Quaternion());
  const tmpPosRef = React.useRef(new THREE.Vector3());
  const aPosRef = React.useRef(new THREE.Vector3());
  const bPosRef = React.useRef(new THREE.Vector3());

  const smoothProgressRef = React.useRef(0);
  const lastProgressRef = React.useRef(-1);
  const settlingRef = React.useRef(true);

  React.useEffect(() => {
    const geo = new THREE.IcosahedronGeometry(1, 0); // lower poly = faster
    const mat = createDotMaterial();

    const instanceColors = new Float32Array(DOT_COUNT * 3);
    for (let i = 0; i < DOT_COUNT; i++) {
      const c = dots[i].color;
      instanceColors[i * 3 + 0] = c.r;
      instanceColors[i * 3 + 1] = c.g;
      instanceColors[i * 3 + 2] = c.b;
    }
    geo.setAttribute(
      "aInstanceColor",
      new THREE.InstancedBufferAttribute(instanceColors, 3)
    );

    const maxEdges = Math.max(networkEdges.length, triangleEdges.length);
    const positions = new Float32Array(maxEdges * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.0,
      color: 0x9aa0a6,
    });

    geoRef.current = geo;
    matRef.current = mat;
    lineGeoRef.current = lineGeo;
    lineMatRef.current = lineMat;

    if (meshRef.current) {
      meshRef.current.geometry = geo;
      meshRef.current.material = mat;

      const m = matrixRef.current;
      const q = quatRef.current;
      const sc = scaleRef.current;

      for (let i = 0; i < DOT_COUNT; i++) {
        sc.setScalar(0.001);
        m.compose(dots[i].networkPos, q, sc);
        meshRef.current.setMatrixAt(i, m);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.geometry = lineGeo;
      linesRef.current.material = lineMat;
    }

    // kick initial render
    invalidate();

    return () => {
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      geoRef.current = null;
      matRef.current = null;
      lineGeoRef.current = null;
      lineMatRef.current = null;
    };
  }, [dots, networkEdges.length, triangleEdges.length, invalidate]);

  useFrame(({ camera, clock }) => {
    const mat = matRef.current;
    const lineGeo = lineGeoRef.current;
    const lineMat = lineMatRef.current;
    const mesh = meshRef.current;
    if (!mat || !lineGeo || !lineMat || !mesh) return;

    const time = clock.getElapsedTime();
    const raw = progressRef.current;

    // only animate while scroll is changing or easing is settling
    smoothProgressRef.current += (raw - smoothProgressRef.current) * 0.14;
    const progress = smoothProgressRef.current;

    const delta = Math.abs(progress - lastProgressRef.current);
    const rawDelta = Math.abs(raw - lastProgressRef.current);

    // heuristic: keep rendering until near-still
    if (delta < 0.0004 && rawDelta < 0.0004) {
      settlingRef.current = false;
    } else {
      settlingRef.current = true;
    }
    lastProgressRef.current = progress;

    // update uniforms
    mat.uniforms.uTime.value = time;
    mat.uniforms.uFade.value = smoothstep(clamp(progress * 1.25, 0, 1));

    const appear = clamp(progress * 2, 0, 1);
    const morph = easeInOut(clamp((progress - 0.22) / 0.58, 0, 1));
    const refine = smoothstep(clamp((progress - 0.72) / 0.28, 0, 1));
    const t = smoothstep(progress);

    // camera dolly-through
    const camDist = THREE.MathUtils.lerp(10.5, 3.9, t);
    const camZPush = THREE.MathUtils.lerp(2.2, -0.35, t);
    const camY = THREE.MathUtils.lerp(0.6, 0.12, t);
    const camX = Math.sin(time * 0.12) * 0.12 * (1 - t);

    camera.position.set(camX, camY, camDist + camZPush);
    camera.lookAt(0, 0.1, 0);

    const m = matrixRef.current;
    const q = quatRef.current;
    const sc = scaleRef.current;
    const tmpPos = tmpPosRef.current;

    // organic motion fades out early for perf + “polish”
    const organicAmt = (1 - morph) * 0.012;

    // dots (matrix updates only)
    for (let i = 0; i < DOT_COUNT; i++) {
      const dot = dots[i];

      const appearDelay = i === 0 ? 0 : 0.08 + i * 0.05;
      const ap = clamp((appear - appearDelay) * 2.5, 0, 1);

      if (ap <= 0.01) {
        sc.setScalar(0.001);
        m.compose(dot.networkPos, q, sc);
        mesh.setMatrixAt(i, m);
        continue;
      }

      tmpPos.copy(dot.networkPos).lerp(dot.trianglePos, morph);

      if (organicAmt > 0.0001) {
        tmpPos.x += Math.sin(time * 0.55 + i * 0.3) * organicAmt;
        tmpPos.y += Math.cos(time * 0.45 + i * 0.5) * organicAmt;
      }

      const baseR =
        i === 0 ? THREE.MathUtils.lerp(0.085, 0.105, morph) : dot.radius;

      const finalScale = baseR * smoothstep(ap) * (1 + refine * 0.09);

      sc.setScalar(finalScale);
      m.compose(tmpPos, q, sc);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // lines
    const edges = morph > 0.62 ? triangleEdges : networkEdges;
    const lineReveal = clamp((appear - 0.18) / 0.55, 0, 1);
    const visibleEdges = Math.floor(edges.length * lineReveal);

    const positions = lineGeo.getAttribute("position").array as Float32Array;
    const aPos = aPosRef.current;
    const bPos = bPosRef.current;

    let idx = 0;

    for (let i = 0; i < visibleEdges; i++) {
      const [a, b] = edges[i];
      const da = dots[a];
      const db = dots[b];

      aPos.copy(da.networkPos).lerp(da.trianglePos, morph);
      bPos.copy(db.networkPos).lerp(db.trianglePos, morph);

      if (organicAmt > 0.0001) {
        aPos.x += Math.sin(time * 0.55 + a * 0.3) * organicAmt;
        aPos.y += Math.cos(time * 0.45 + a * 0.5) * organicAmt;
        bPos.x += Math.sin(time * 0.55 + b * 0.3) * organicAmt;
        bPos.y += Math.cos(time * 0.45 + b * 0.5) * organicAmt;
      }

      positions[idx++] = aPos.x;
      positions[idx++] = aPos.y;
      positions[idx++] = aPos.z;

      positions[idx++] = bPos.x;
      positions[idx++] = bPos.y;
      positions[idx++] = bPos.z;
    }

    lineGeo.getAttribute("position").needsUpdate = true;
    lineGeo.setDrawRange(0, visibleEdges * 2);

    const baseOpacity = THREE.MathUtils.lerp(0.2, 0.46, smoothstep(lineReveal));
    lineMat.opacity = baseOpacity * (1 + refine * 0.14);

    // 🚨 demand loop: keep rendering ONLY while settling
    if (settlingRef.current || organicAmt > 0.0001) invalidate();
  });

  // placeholders once; replaced in effect
  const placeholderGeo = React.useMemo(
    () => new THREE.IcosahedronGeometry(1, 0),
    []
  );
  const placeholderMat = React.useMemo(
    () => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
    []
  );
  const placeholderLineGeo = React.useMemo(
    () => new THREE.BufferGeometry(),
    []
  );
  const placeholderLineMat = React.useMemo(
    () => new THREE.LineBasicMaterial({ transparent: true, opacity: 0 }),
    []
  );

  React.useEffect(() => {
    return () => {
      placeholderGeo.dispose();
      placeholderMat.dispose();
      placeholderLineGeo.dispose();
      placeholderLineMat.dispose();
    };
  }, [placeholderGeo, placeholderMat, placeholderLineGeo, placeholderLineMat]);

  return (
    <>
      {/* simpler lighting (much cheaper than Environment/PMREM) */}
      <ambientLight intensity={0.6} />
      <hemisphereLight
        intensity={0.55}
        groundColor={new THREE.Color(0x050607)}
      />
      <directionalLight position={[5, 8, 6]} intensity={0.85} />

      <instancedMesh
        ref={meshRef}
        args={[placeholderGeo, placeholderMat, DOT_COUNT]}
        frustumCulled={false}
      />

      <lineSegments
        ref={linesRef}
        args={[placeholderLineGeo, placeholderLineMat]}
        frustumCulled={false}
      />
    </>
  );
}

export default function PatternStorySection({
  screens = 4,
}: {
  screens?: number;
}) {
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressRef = React.useRef(0);

  // React only updates when chapter changes
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeIndexRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = clamp(v, 0, 1);

    const next = Math.min(
      CHAPTERS.length - 1,
      Math.floor(progressRef.current * CHAPTERS.length)
    );

    if (next === activeIndexRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      activeIndexRef.current = next;
      setActiveIndex(next);
    });
  });

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const chapter = CHAPTERS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={s.section}
      style={{ height: `${screens * 100}vh` }}
    >
      <div className={s.sticky}>
        <Canvas
          className={s.canvas}
          frameloop="demand"
          dpr={[1, 1.5]} // slightly lower = smoother overall
          camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0.4, 7.5] }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <React.Suspense fallback={null}>
            <AtomsScene progressRef={progressRef} />
          </React.Suspense>
        </Canvas>

        <div className={s.scrim} />

        <div className={s.overlay}>
          <div key={activeIndex} className={s.card}>
            <div className={s.cardContent}>
              <div className={s.kicker}>{chapter.kicker}</div>
              <h2 className={s.title}>{chapter.title}</h2>
              <p className={s.body}>{chapter.body}</p>

              <div className={s.dots} aria-hidden="true">
                {CHAPTERS.map((_, i) => (
                  <span
                    key={i}
                    className={i === activeIndex ? s.dotActive : s.dot}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
