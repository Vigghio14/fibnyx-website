import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

const RobotScene: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = (splineApp: Application) => {
        // Override the background color to match the site's dark theme
        // This bypasses any background set in the Spline editor or CDN cache
        try {
            splineApp.setBackgroundColor('#030712');
        } catch (e) {
            // Fallback: force the canvas background via DOM
            const canvas = document.querySelector('.robot-scene-wrapper canvas') as HTMLCanvasElement;
            if (canvas) {
                canvas.style.background = '#030712';
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="robot-scene-wrapper">
            {isLoading && (
                <div className="loader-container">
                    <div className="shimmer-loader"></div>
                    <p>Caricamento...</p>
                </div>
            )}

            <Suspense fallback={null}>
                <Spline
                    scene="https://prod.spline.design/F2U5cNClmniJO4Iu/scene.splinecode"
                    onLoad={handleLoad}
                    style={{ width: '100%', height: '100%' }}
                />
            </Suspense>

            {/* Cover the Spline watermark in the bottom-right corner */}
            <div className="watermark-cover" />

            <style>{`
                .robot-scene-wrapper {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    overflow: hidden;
                    background: #030712;
                }

                .loader-container {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: #94a3b8;
                    font-family: inherit;
                    z-index: 10;
                    background: #030712;
                }

                .shimmer-loader {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(59, 130, 246, 0.1);
                    border-top: 3px solid #3b82f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Cover the Spline watermark badge (bottom-right area) */
                .watermark-cover {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 160px;
                    height: 50px;
                    background: #030712;
                    z-index: 100;
                }

                canvas {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default RobotScene;
