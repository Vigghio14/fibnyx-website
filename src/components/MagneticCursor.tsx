import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MagneticCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            if (!isVisible) setIsVisible(true);

            // Animation for dot (very fast)
            gsap.to(dotRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out',
            });

            // Animation for ring (delayed/lerp)
            gsap.to(ringRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.4,
                ease: 'power3.out',
            });
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Magnetic effect on elements with .magnetic class
            if (target.classList.contains('magnetic') || target.closest('.magnetic')) {
                gsap.to(ringRef.current, {
                    scale: 2.5,
                    borderColor: 'var(--neon-cyan)',
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    duration: 0.3,
                });
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('magnetic') || target.closest('.magnetic')) {
                gsap.to(ringRef.current, {
                    scale: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                    duration: 0.3,
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
        };
    }, [isVisible]);

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
            <div
                ref={ringRef}
                className="cursor-ring"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
            <style>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: var(--neon-cyan);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px var(--neon-cyan);
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: border-color 0.3s, background-color 0.3s;
        }
        @media (max-width: 1024px) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
        </>
    );
};

export default MagneticCursor;
