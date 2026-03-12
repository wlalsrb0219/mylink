"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const ballRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 공의 상태 (위치, 속도)
  const pos = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const tilt = useRef({ beta: 0, gamma: 0 });

  // 센서 권한 요청 (iOS 13+ 대응)
  const requestPermission = async () => {
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        } else {
          setError("기울기 센서 권한이 거부되었습니다.");
        }
      } catch (err) {
        setError("권한 요청 중 오류가 발생했습니다.");
      }
    } else {
      // Android나 구형 브라우저
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!permissionGranted) return;

    // 기기 기울기 감지 이벤트 리스너
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // beta: 앞뒤 기울기 (-180 ~ 180)
      // gamma: 좌우 기울기 (-90 ~ 90)
      tilt.current.beta = e.beta || 0;
      tilt.current.gamma = e.gamma || 0;
    };

    window.addEventListener("deviceorientation", handleOrientation);

    // 초기 위치 설정 (중앙)
    if (containerRef.current) {
      pos.current.x = window.innerWidth / 2;
      pos.current.y = window.innerHeight / 2;
    }

    // 애니메이션 루프
    let animationId: number;
    const update = () => {
      if (!ballRef.current || !containerRef.current) return;

      const friction = 0.98; // 마찰력
      const sensitivity = 0.15; // 민감도
      const ballSize = 50; // 공 크기

      // 기울기에 따른 가속도 적용
      pos.current.vx += tilt.current.gamma * sensitivity;
      pos.current.vy += tilt.current.beta * sensitivity;

      // 마찰력 적용
      pos.current.vx *= friction;
      pos.current.vy *= friction;

      // 위치 업데이트
      pos.current.x += pos.current.vx;
      pos.current.y += pos.current.vy;

      // 벽 충돌 처리 (바운스)
      const maxX = window.innerWidth - ballSize;
      const maxY = window.innerHeight - ballSize;

      if (pos.current.x < 0) {
        pos.current.x = 0;
        pos.current.vx *= -0.5;
      } else if (pos.current.x > maxX) {
        pos.current.x = maxX;
        pos.current.vx *= -0.5;
      }

      if (pos.current.y < 0) {
        pos.current.y = 0;
        pos.current.vy *= -0.5;
      } else if (pos.current.y > maxY) {
        pos.current.y = maxY;
        pos.current.vy *= -0.5;
      }

      // DOM 업데이트 (성능을 위해 Ref 직접 조작)
      ballRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      cancelAnimationFrame(animationId);
    };
  }, [permissionGranted]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-slate-900 flex items-center justify-center"
    >
      {!permissionGranted ? (
        <div className="z-10 text-center px-6">
          <h1 className="text-3xl font-bold text-white mb-6">Rolling Ball</h1>
          <p className="text-slate-400 mb-8">기기를 기울여 공을 움직여보세요!</p>
          <button
            onClick={requestPermission}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all active:scale-95"
          >
            센서 활성화 및 시작
          </button>
          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
        </div>
      ) : (
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          {/* 공 (Ball) */}
          <div
            ref={ballRef}
            className="absolute w-[50px] h-[50px] bg-gradient-to-br from-orange-400 to-red-600 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(0,0,0,0.3)] flex items-center justify-center transition-none"
            style={{ willChange: "transform" }}
          >
             {/* 공 위의 하이라이트 효과 */}
             <div className="absolute top-2 left-3 w-3 h-3 bg-white/40 rounded-full blur-[1px]"></div>
          </div>

          {/* 안내 텍스트 (배경) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
            <span className="text-white text-9xl font-black italic">TILT ME</span>
          </div>
        </div>
      )}

      {/* 바닥 질감 느낌의 격자 무늬 (배경) */}
      <div className="absolute inset-0 z-[-1] opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
    </div>
  );
}
