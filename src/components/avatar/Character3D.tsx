import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

import { getCharacterModel, CHARACTER_MODELS } from '../../data/characterModels';
import { Gender } from '../../types';

// Preload all four final character models to ensure instant zero-latency rendering
try {
  useGLTF.preload(CHARACTER_MODELS.girl.standing);
  useGLTF.preload(CHARACTER_MODELS.girl.sitting);
  useGLTF.preload(CHARACTER_MODELS.boy.standing);
  useGLTF.preload(CHARACTER_MODELS.boy.sitting);
} catch {
  // Handled by Suspense & error boundary
}

export type CharacterPose = 'full' | 'standing' | 'desk' | 'sitting' | 'compact';
export type LightingPreset = 'cozy' | 'desk' | 'sunset' | 'night';

export interface Character3DProps {
  // Character Gender mapping (girl vs boy)
  gender?: Gender;

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

  // Showcase UI Controls (Overlayed on the single canvas, NO second canvas)
  showControls?: boolean;
  badgeText?: string;

  // Model URL override (defaults to user's actual GLB)
  modelUrl?: string;

  // Custom styling
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Responsive Camera Hook:
 * Calculates container aspect ratio and positions the camera at the exact distance needed
 * to guarantee that the character is NEVER cropped from head to shoes or elbow to elbow
 * on any screen size (mobile, tablet, desktop, square cards).
 */
const ResponsiveCameraController: React.FC<{
  target: [number, number, number];
  customPos?: [number, number, number];
}> = ({ target, customPos }) => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (customPos) {
      camera.position.set(customPos[0], customPos[1], customPos[2]);
      camera.lookAt(target[0], target[1], target[2]);
      camera.updateProjectionMatrix();
      return;
    }

    const aspect = size.width / Math.max(size.height, 1);
    const persCamera = camera as THREE.PerspectiveCamera;
    const halfFovRad = persCamera.fov * (Math.PI / 360);
    const tanHalfFov = Math.tan(halfFovRad);

    // Character normalized height is 2.0 (-1.0 to +1.0).
    // Target comfortable vertical span is 2.45 (with ~22% margin top and bottom).
    const distanceToFitHeight = 1.225 / tanHalfFov;

    // Character normalized width is ~0.88 (-0.44 to +0.44).
    // Target comfortable horizontal span is 1.15.
    const distanceToFitWidth = (1.15 / 2) / (tanHalfFov * aspect);

    // Use whichever distance is larger so neither height nor width ever gets cropped
    const finalDistance = Math.max(3.1, distanceToFitHeight, distanceToFitWidth);

    camera.position.set(0, 0.05, finalDistance);
    camera.lookAt(target[0], target[1], target[2]);
    camera.updateProjectionMatrix();
  }, [camera, size, target, customPos]);

  return null;
};

/**
 * Inner 3D Model Renderer:
 * Centers the character mesh precisely at (0, 0, 0) and normalizes height to 2.0.
 * Head is at Y = +1.0, feet are at Y = -1.0, center is at Y = 0.0.
 */
interface ModelMeshProps {
  modelUrl: string;
  enableFloating: boolean;
  floatingSpeed: number;
  floatingIntensity: number;
  userScale?: number;
  userPosition?: [number, number, number];
  userRotation?: [number, number, number];
}

const CharacterModelMesh: React.FC<ModelMeshProps> = ({
  modelUrl,
  enableFloating,
  floatingSpeed,
  floatingIntensity,
  userScale = 1,
  userPosition = [0, 0, 0],
  userRotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(modelUrl);

  // Normalize model bounds once per GLTF
  const { scene, baseScale, centerOffset } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Normalize character height to exactly 2.0 units
    const modelHeight = Math.max(size.y, 0.01);
    const scale = 2.0 / modelHeight;

    // Exact center offset so the character's geometric center rests at (0, 0, 0)
    // Feet are at Y = -1.0, Head is at Y = +1.0
    const offset = new THREE.Vector3(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

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
      centerOffset: offset,
    };
  }, [gltf]);

  // Gentle, non-deforming presentation animation (breathing/hovering)
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (enableFloating) {
      const bob = Math.sin(t * floatingSpeed) * floatingIntensity;
      const sway = Math.sin(t * (floatingSpeed * 0.5)) * (floatingIntensity * 0.35);

      groupRef.current.position.y = centerOffset.y + userPosition[1] + bob;
      groupRef.current.rotation.z = userRotation[2] + sway;
    } else {
      groupRef.current.position.y = centerOffset.y + userPosition[1];
      groupRef.current.rotation.z = userRotation[2];
    }
  });

  const finalScale = baseScale * userScale;

  return (
    <group
      ref={groupRef}
      scale={[finalScale, finalScale, finalScale]}
      position={[centerOffset.x + userPosition[0], centerOffset.y + userPosition[1], centerOffset.z + userPosition[2]]}
      rotation={[userRotation[0], userRotation[1], userRotation[2]]}
    >
      <primitive object={scene} />
    </group>
  );
};

/**
 * Aesthetic marble cafe pedestal positioned right below feet (Y = -1.03)
 */
const Pedestal3D: React.FC = () => {
  return (
    <group position={[0, -1.03, 0]}>
      {/* Top marble disc */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.15, 0.08, 48]} />
        <meshStandardMaterial color="#FFF7F3" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Rose-gold ring */}
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[1.16, 1.16, 0.025, 48]} />
        <meshStandardMaterial color="#F2C1B6" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Bottom base */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[1.22, 1.32, 0.1, 48]} />
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
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
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
          background: 'rgba(255, 248, 245, 0.85)',
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
 * Error display
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
  gender = 'girl',
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
  cameraFov = 42,
  cameraTarget = [0, 0, 0],
  modelScale,
  modelPosition,
  modelRotation,
  interactive = false,
  autoRotate = false,
  autoRotateSpeed = 1.0,
  enableFloating = true,
  floatingSpeed = 1.8,
  floatingIntensity = 0.03,
  showControls = false,
  badgeText,
  modelUrl,
  className = '',
  style = {},
}) => {
  // Resolve model URL from centralized config if not explicitly provided
  const resolvedUrl = modelUrl || getCharacterModel(gender, pose);
  const [activeUrl, setActiveUrl] = useState(resolvedUrl);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isFloatingActive, setIsFloatingActive] = useState(enableFloating);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const controlsRef = useRef<any>(null);

  // Sync external changes
  useEffect(() => {
    setActiveUrl(modelUrl || getCharacterModel(gender, pose));
  }, [modelUrl, gender, pose]);

  // Determine container dimensions
  const finalWidth = size ?? width ?? (pose === 'compact' ? 120 : '100%');
  const finalHeight = size ?? height ?? (pose === 'compact' ? 140 : pose === 'desk' ? 320 : 500);
  const isCompact = (typeof finalWidth === 'number' && finalWidth < 180) || pose === 'compact';

  const handleAngleChange = (angle: number) => {
    if (controlsRef.current) {
      controlsRef.current.setAzimuthalAngle(angle);
      controlsRef.current.setPolarAngle(Math.PI / 2.05);
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
    setActiveUrl(modelUrl || getCharacterModel(gender, pose));
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
            top: 14,
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
            camera={{ position: cameraPosition || [0, 0.05, 3.2], fov: cameraFov }}
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
            {/* Dynamic camera adapter ensuring full-body visibility without cropping */}
            <ResponsiveCameraController
              target={cameraTarget}
              customPos={cameraPosition}
            />

            {/* Lighting tailored to preset */}
            {lighting === 'desk' ? (
              <>
                <ambientLight intensity={1.4} color="#FFF8F0" />
                <directionalLight position={[2.5, 4, 3.5]} intensity={1.6} color="#FFEED9" castShadow />
                <directionalLight position={[-2.5, 2, -1.5]} intensity={0.7} color="#E8D5F5" />
                <pointLight position={[0, 0.5, 2.0]} intensity={0.5} color="#FFE5D9" />
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
                <pointLight position={[0, 0.5, 2.5]} intensity={0.4} color="#FFEBE8" />
                <pointLight position={[0, 3.5, 0]} intensity={0.5} color="#FFF8F0" />
              </>
            )}

            {/* The Actual 3D Model: Centered at (0, 0, 0) */}
            <CharacterModelMesh
              modelUrl={activeUrl}
              enableFloating={isFloatingActive}
              floatingSpeed={floatingSpeed}
              floatingIntensity={floatingIntensity}
              userScale={modelScale}
              userPosition={modelPosition}
              userRotation={modelRotation}
            />

            {/* Optional Aesthetic Pedestal (Right below feet at Y = -1.03) */}
            {showPedestal && <Pedestal3D />}

            {/* Soft Contact Shadow (Right below feet at Y = -1.02) */}
            {showShadow && (
              <ContactShadows
                position={[0, -1.02, 0]}
                opacity={0.65}
                scale={2.6}
                blur={2.0}
                far={1.6}
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
                minDistance={1.8}
                maxDistance={4.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2 + 0.05}
                autoRotate={isRotating}
                autoRotateSpeed={autoRotateSpeed}
                dampingFactor={0.06}
                enableDamping={true}
                target={cameraTarget}
              />
            )}
          </Canvas>
        )}
      </Suspense>

      {/* Overlayed Interactive Controls Bar (Direct HTML overlay, ZERO extra Canvas/model) */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.45rem',
            zIndex: 15,
            width: '92%',
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
