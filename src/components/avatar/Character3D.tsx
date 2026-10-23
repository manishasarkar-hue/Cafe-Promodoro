import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Coffee,
  AlertCircle,
} from 'lucide-react';

// Single source of truth for the user's actual 3D character model
export const DEFAULT_MODEL_URL = '/models/model(1).glb';
export const FALLBACK_MODEL_URL = '/models/model (1).glb';

// Preload the GLB immediately at module load time to avoid re-fetching across screens
try {
  useGLTF.preload(DEFAULT_MODEL_URL);
} catch {
  try {
    useGLTF.preload(FALLBACK_MODEL_URL);
  } catch {
    // Ignore preload error, handled by Suspense & error boundary
  }
}

export type CharacterPose = 'full' | 'standing' | 'desk' | 'compact';
export type LightingPreset = 'cozy' | 'desk' | 'sunset' | 'night';

export interface Character3DProps {
  // Dimensions
  width?: number | string;
  height?: number | string;
  size?: number;

  // Visual & Scene Configuration
  pose?: CharacterPose;
  lighting?: LightingPreset;
  showPedestal?: boolean;
  showShadow?: boolean;
  showSparkles?: boolean;
  background?: string;

  // Camera overrides (optional)
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  cameraTarget?: [number, number, number];

  // Model placement
  modelScale?: number;
  modelPosition?: [number, number, number];
  modelRotation?: [number, number, number];

  // Interaction & Animation
  interactive?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableFloating?: boolean;
  floatingSpeed?: number;
  floatingIntensity?: number;

  // Showcase UI Controls
  showControls?: boolean;
  badgeText?: string;

  // Model URL override (defaults to user's actual GLB)
  modelUrl?: string;

  // Custom styling
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Inner 3D Model Renderer
 */
interface ModelMeshProps {
  modelUrl: string;
  enableFloating: boolean;
  floatingSpeed: number;
  floatingIntensity: number;
  userScale?: number;
  userPosition?: [number, number, number];
  userRotation?: [number, number, number];
  pose: CharacterPose;
}

const CharacterModelMesh: React.FC<ModelMeshProps> = ({
  modelUrl,
  enableFloating,
  floatingSpeed,
  floatingIntensity,
  userScale = 1,
  userPosition = [0, 0, 0],
  userRotation = [0, 0, 0],
  pose,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(modelUrl);

  // Normalize model bounds once per GLTF
  const { scene, baseScale, baseOffsetY } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);

    // Normalize character to ~2.0 height units
    const maxDim = Math.max(size.y, 0.01);
    const scale = 2.0 / maxDim;

    // Align feet to Y = 0
    const bottomY = box.min.y;
    const yOff = -bottomY * scale;

    // Soft, cozy material tuning for chibi aesthetics
    cloned.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = Math.min(mat.roughness ?? 0.7, 0.85);
          mat.metalness = Math.max(mat.metalness ?? 0, 0.05);
          mat.needsUpdate = true;
        }
      }
    });

    return {
      scene: cloned,
      baseScale: scale,
      baseOffsetY: yOff,
    };
  }, [gltf]);

  // Gentle presentation animation (breathing/hovering)
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (enableFloating) {
      const bob = Math.sin(t * floatingSpeed) * floatingIntensity;
      const sway = Math.sin(t * (floatingSpeed * 0.5)) * (floatingIntensity * 0.35);

      groupRef.current.position.y = baseOffsetY + userPosition[1] + bob;
      groupRef.current.rotation.z = userRotation[2] + sway;
    } else {
      groupRef.current.position.y = baseOffsetY + userPosition[1];
      groupRef.current.rotation.z = userRotation[2];
    }
  });

  const finalScale = baseScale * userScale;

  return (
    <group
      ref={groupRef}
      scale={[finalScale, finalScale, finalScale]}
      position={[userPosition[0], baseOffsetY + userPosition[1], userPosition[2]]}
      rotation={[userRotation[0], userRotation[1], userRotation[2]]}
    >
      <primitive object={scene} />
    </group>
  );
};

/**
 * Aesthetic marble cafe pedestal
 */
const Pedestal3D: React.FC = () => {
  return (
    <group position={[0, -0.02, 0]}>
      {/* Top marble disc */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.25, 0.1, 48]} />
        <meshStandardMaterial color="#FFF7F3" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Rose-gold ring */}
      <mesh position={[0, -0.11, 0]}>
        <cylinderGeometry args={[1.27, 1.27, 0.03, 48]} />
        <meshStandardMaterial color="#F2C1B6" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Bottom base */}
      <mesh position={[0, -0.18, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.45, 0.12, 48]} />
        <meshStandardMaterial color="#FCEEE8" roughness={0.6} metalness={0.05} />
      </mesh>
    </group>
  );
};

/**
 * Ambient floating particles in 3D
 */
const AmbientSparkles3D: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const pos = new Float32Array(35 * 3);
    for (let i = 0; i < 35; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.6;
      pos[i * 3 + 1] = Math.random() * 2.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.3;
    }
    return pos;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.042}
        color="#FFAAA6"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/**
 * Loading indicator
 */
const ModelLoadingIndicator: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { progress } = useProgress();

  if (compact) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 248, 245, 0.75)',
          borderRadius: 16,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '1.2rem', animation: 'floatGentle 2s infinite' }}>☕</div>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B56B5D', marginTop: 2 }}>
          {Math.round(progress)}%
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 246, 243, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 20,
        borderRadius: 24,
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFCAD4 0%, #FF85A1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(255, 133, 161, 0.35)',
          marginBottom: '0.8rem',
          animation: 'floatGentle 2.5s ease-in-out infinite',
        }}
      >
        <Coffee size={24} color="#FFFFFF" />
      </div>

      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#4A342B',
          marginBottom: '0.3rem',
        }}
      >
        Brewing 3D Character...
      </div>

      <div
        style={{
          width: 180,
          height: 8,
          background: '#FFE0D6',
          borderRadius: 999,
          overflow: 'hidden',
          marginTop: '0.5rem',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.max(progress, 10)}%`,
            background: 'linear-gradient(90deg, #FF9EAA 0%, #FF6B8B 100%)',
            borderRadius: 999,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#B56B5D', marginTop: '0.4rem' }}>
        {Math.round(progress)}% loaded
      </div>
    </div>
  );
};

/**
 * Error boundary view
 */
const ModelErrorDisplay: React.FC<{ onRetry: () => void; compact?: boolean }> = ({
  onRetry,
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFF5F2',
          borderRadius: 16,
          zIndex: 10,
          cursor: 'pointer',
        }}
        onClick={onRetry}
        title="Click to retry loading 3D character"
      >
        <AlertCircle size={18} color="#D64545" />
        <span style={{ fontSize: '0.62rem', color: '#8A584C', marginTop: 2 }}>Retry</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFF5F2',
        borderRadius: 24,
        padding: '1.5rem',
        textAlign: 'center',
        zIndex: 20,
      }}
    >
      <AlertCircle size={28} color="#D64545" style={{ marginBottom: '0.5rem' }} />
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#5C3830' }}>
        Character couldn't load
      </div>
      <button
        onClick={onRetry}
        style={{
          marginTop: '0.8rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#FF85A1',
          color: '#FFF',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.8rem',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <RotateCcw size={14} />
        <span>Retry</span>
      </button>
    </div>
  );
};

/**
 * Reusable Unified 3D Character Component
 */
export const Character3D: React.FC<Character3DProps> = ({
  width,
  height,
  size,
  pose = 'full',
  lighting = 'cozy',
  showPedestal = false,
  showShadow = true,
  showSparkles = false,
  background = 'transparent',
  cameraPosition,
  cameraFov,
  cameraTarget,
  modelScale,
  modelPosition,
  modelRotation,
  interactive = false,
  autoRotate = false,
  autoRotateSpeed = 1.0,
  enableFloating = true,
  floatingSpeed = 1.8,
  floatingIntensity = 0.035,
  showControls = false,
  badgeText,
  modelUrl = DEFAULT_MODEL_URL,
  className = '',
  style = {},
}) => {
  const [activeUrl, setActiveUrl] = useState(modelUrl);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isFloatingActive, setIsFloatingActive] = useState(enableFloating);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const controlsRef = useRef<any>(null);

  // Sync external changes
  useEffect(() => {
    setActiveUrl(modelUrl);
  }, [modelUrl]);

  // Determine container dimensions
  const finalWidth = size ?? width ?? (pose === 'compact' ? 120 : '100%');
  const finalHeight = size ?? height ?? (pose === 'compact' ? 130 : pose === 'desk' ? 240 : 480);
  const isCompact = (typeof finalWidth === 'number' && finalWidth < 180) || pose === 'compact';

  // Preset camera configurations according to pose
  const defaultCam = useMemo<{
    pos: [number, number, number];
    fov: number;
    target: [number, number, number];
  }>(() => {
    switch (pose) {
      case 'desk':
        // Framing upper body & face over study desk
        return {
          pos: [0, 0.45, 1.8],
          fov: 40,
          target: [0, 0.38, 0],
        };
      case 'compact':
        // Framing full body in small avatar circle/card
        return {
          pos: [0, 0.1, 2.75],
          fov: 42,
          target: [0, 0.08, 0],
        };
      case 'full':
      case 'standing':
      default:
        // Full showcase view
        return {
          pos: [0, 0.2, 3.2],
          fov: 42,
          target: [0, 0.35, 0],
        };
    }
  }, [pose]);

  const activeCamPos = cameraPosition ?? defaultCam.pos;
  const activeFov = cameraFov ?? defaultCam.fov;
  const activeTarget = cameraTarget ?? defaultCam.target;

  const handleAngleChange = (angle: number) => {
    if (controlsRef.current) {
      controlsRef.current.setAzimuthalAngle(angle);
      controlsRef.current.setPolarAngle(Math.PI / 2.2);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setIsRotating(autoRotate);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setActiveUrl((prev) => (prev === DEFAULT_MODEL_URL ? FALLBACK_MODEL_URL : DEFAULT_MODEL_URL));
    setRetryCount((c) => c + 1);
  };

  return (
    <div
      className={`character-3d-container ${className}`}
      style={{
        position: 'relative',
        width: finalWidth,
        height: finalHeight,
        background,
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Optional Badge Tag */}
      {badgeText && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(6px)',
            border: '1.5px solid #FFD8CE',
            borderRadius: 'var(--radius-pill)',
            padding: '0.24rem 0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#7A4E42',
            boxShadow: '0 4px 12px rgba(180, 120, 110, 0.08)',
            zIndex: 10,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <Sparkles size={11} color="#FF758F" />
          <span>{badgeText}</span>
        </div>
      )}

      {/* 3D Canvas */}
      <Suspense fallback={<ModelLoadingIndicator compact={isCompact} />}>
        {hasError ? (
          <ModelErrorDisplay onRetry={handleRetry} compact={isCompact} />
        ) : (
          <Canvas
            key={retryCount}
            camera={{ position: activeCamPos, fov: activeFov }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.05,
            }}
            style={{ width: '100%', height: '100%', pointerEvents: interactive ? 'auto' : 'none' }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            {/* Lighting tailored to preset */}
            {lighting === 'desk' ? (
              <>
                <ambientLight intensity={1.4} color="#FFF8F0" />
                <directionalLight position={[2, 4, 3]} intensity={1.5} color="#FFEED9" castShadow />
                <directionalLight position={[-2, 2, -1]} intensity={0.6} color="#E8D5F5" />
                <pointLight position={[0, 1.2, 1.5]} intensity={0.5} color="#FFE5D9" />
              </>
            ) : lighting === 'sunset' ? (
              <>
                <ambientLight intensity={1.2} color="#FFEBD9" />
                <directionalLight position={[4, 3, 3]} intensity={1.8} color="#FFB088" />
                <directionalLight position={[-3, 2, -2]} intensity={0.7} color="#D8B4E2" />
              </>
            ) : (
              <>
                {/* Default Cozy Cafe Lighting */}
                <ambientLight intensity={1.35} color="#FFF5EE" />
                <directionalLight position={[3.5, 5, 4]} intensity={1.6} color="#FFE6D5" castShadow />
                <directionalLight position={[-3.5, 3, -2]} intensity={0.75} color="#EBD8FF" />
                <pointLight position={[0, 1.8, 2.5]} intensity={0.4} color="#FFEBE8" />
                <pointLight position={[0, 4, 0]} intensity={0.5} color="#FFF8F0" />
              </>
            )}

            {/* The Actual 3D Model */}
            <CharacterModelMesh
              modelUrl={activeUrl}
              enableFloating={isFloatingActive}
              floatingSpeed={floatingSpeed}
              floatingIntensity={floatingIntensity}
              userScale={modelScale}
              userPosition={modelPosition}
              userRotation={modelRotation}
              pose={pose}
            />

            {/* Optional Aesthetic Pedestal */}
            {showPedestal && <Pedestal3D />}

            {/* Soft Contact Shadow */}
            {showShadow && (
              <ContactShadows
                position={[0, -0.01, 0]}
                opacity={0.6}
                scale={pose === 'desk' ? 2.0 : 2.5}
                blur={2.0}
                far={1.5}
                color="#5A3A30"
              />
            )}

            {/* Optional Sparkles */}
            {showSparkles && <AmbientSparkles3D />}

            {/* Orbit Controls (Only if interactive) */}
            {interactive && (
              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={true}
                minDistance={1.6}
                maxDistance={4.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2 + 0.05}
                autoRotate={isRotating}
                autoRotateSpeed={autoRotateSpeed}
                dampingFactor={0.06}
                enableDamping={true}
                target={activeTarget}
              />
            )}
          </Canvas>
        )}
      </Suspense>

      {/* Optional Interactive Controls Bar */}
      {showControls && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginTop: '0.65rem',
            zIndex: 15,
          }}
        >
          {/* Spin Toggle */}
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: isRotating ? '#FFF0F3' : '#FFFFFF',
              border: isRotating ? '1.5px solid #FF85A1' : '1.5px solid #FFD5CC',
              borderRadius: 'var(--radius-pill)',
              padding: '0.3rem 0.7rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: isRotating ? '#C43D5D' : '#7A4E42',
              boxShadow: '0 2px 8px rgba(180, 120, 110, 0.08)',
              cursor: 'pointer',
            }}
          >
            {isRotating ? <Pause size={12} /> : <Play size={12} />}
            <span>{isRotating ? 'Spinning' : 'Spin'}</span>
          </button>

          {/* Quick Angles */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1.5px solid #FFE0D6',
              borderRadius: 'var(--radius-pill)',
              padding: '0.12rem 0.2rem',
              boxShadow: '0 2px 8px rgba(180, 120, 110, 0.06)',
            }}
          >
            <button
              onClick={() => handleAngleChange(0)}
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#6A4A3E',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Front
            </button>
            <button
              onClick={() => handleAngleChange(Math.PI / 2)}
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#6A4A3E',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Side
            </button>
            <button
              onClick={() => handleAngleChange(Math.PI)}
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#6A4A3E',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1.5px solid #FFD5CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7A4E42',
              boxShadow: '0 2px 8px rgba(180, 120, 110, 0.08)',
              cursor: 'pointer',
            }}
            title="Reset View"
          >
            <RotateCcw size={13} />
          </button>

          {/* Hover Toggle */}
          <button
            onClick={() => setIsFloatingActive((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: isFloatingActive ? '#FFF4EE' : '#FFFFFF',
              border: isFloatingActive ? '1.5px solid #FFB8A5' : '1.5px solid #FFE0D6',
              borderRadius: 'var(--radius-pill)',
              padding: '0.3rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: isFloatingActive ? '#B55A48' : '#8A584C',
              boxShadow: '0 2px 8px rgba(180, 120, 110, 0.06)',
              cursor: 'pointer',
            }}
          >
            <span>{isFloatingActive ? '✨ Hover' : '🌱 Grounded'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Character3D;
