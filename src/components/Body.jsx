import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';

// Import your local images from the assets folder.
import body1 from '../assets/images/body_1.jpeg';
import body2 from '../assets/images/body_2.jpeg';
import body3 from '../assets/images/body_3.jpeg';
import body4 from '../assets/images/body_4.jpeg';
import body5 from '../assets/images/body_5.jpeg';
import body6 from '../assets/images/body_6.jpeg';
import body7 from '../assets/images/body_7.jpeg';
import body8 from '../assets/images/body_8.jpg';

// Create an array of the imported images to easily loop through them.
const localImages = [body1, body2, body3, body4, body5, body6, body7, body8];

/**
  * Renders a smaller 5x3 grid with a slower, smoother panning animation.
  */
const Body = () => {
    const gridRef = useRef(null);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);
    const NUM_COLS = 5;
    const NUM_ROWS = 3;

    // Effect to load external scripts (GSAP and Lenis) from a CDN.
    useEffect(() => {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        gsapScript.async = true;

        const lenisScript = document.createElement('script');
        lenisScript.src = 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
        lenisScript.async = true;

        let loadedCount = 0;
        const totalScripts = 2;

        const onScriptLoad = () => {
            loadedCount++;
            if (loadedCount === totalScripts) {
                setScriptsLoaded(true);
            }
        };

        gsapScript.onload = onScriptLoad;
        lenisScript.onload = onScriptLoad;

        document.head.appendChild(gsapScript);
        document.head.appendChild(lenisScript);

        return () => {
            if (gsapScript.parentNode) document.head.removeChild(gsapScript);
            if (lenisScript.parentNode) document.head.removeChild(lenisScript);
        };
    }, []);

    // Animation logic using useLayoutEffect.
    useLayoutEffect(() => {
        if (!scriptsLoaded) return;
        const gsap = window.gsap;

        const ctx = gsap.context(() => {
            const imageContainers = gsap.utils.toArray('.image-container');

            imageContainers.forEach((container) => {
                const image = container.querySelector('img');
                const col = parseInt(container.dataset.col, 10);
                const isFirstCol = col === 0;
                const isLastCol = col === NUM_COLS - 1;

                let direction = Math.random() > 0.5 ? 1 : -1;
                if (isFirstCol) direction = 1;
                if (isLastCol) direction = -1;

                gsap.set(image, { scale: 1.1 });

                const tl = gsap.timeline({
                    repeat: -1,
                    yoyo: true,
                    delay: Math.random() * 4,
                    defaults: {
                        // 1. Increased duration for a slower effect (6 to 10 seconds).
                        duration: 2 + Math.random() * 2,
                        // 2. Changed ease for a smoother feel.
                        ease: 'power2.inOut',
                    },
                });

                tl.to(image, {
                    xPercent: direction * 50,
                    opacity: 0,
                    scale: 1,
                });
            });
        }, gridRef);

        return () => ctx.revert();
    }, [scriptsLoaded]);

    // Effect for initializing Lenis smooth scrolling.
    useEffect(() => {
        if (!scriptsLoaded) return;

        const Lenis = window.Lenis;
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, [scriptsLoaded]);

    const renderGrid = () => {
        let imageIndex = 0;
        return Array.from({ length: NUM_COLS * NUM_ROWS }).map((_, index) => {
            const rowIndex = Math.floor(index / NUM_COLS);
            const colIndex = index % NUM_COLS;
            const hasImage = (rowIndex + colIndex) % 2 === 0;
            const key = `${rowIndex}-${colIndex}`;

            let imageSrc = '';
            if (hasImage) {
                imageSrc = localImages[imageIndex % localImages.length];
                imageIndex++;
            }

            return (
                <div
                    key={key}
                    className="aspect-square bg-neutral-100 border-[0.5px] border-gray-400 flex items-center justify-center relative overflow-hidden"
                >
                    {hasImage && (
                        <div
                            className="image-container w-full h-full"
                            data-col={colIndex}
                            data-row={rowIndex}
                        >
                            <img
                                src={imageSrc}
                                alt={`Grid cell ${key}`}
                                className="w-full h-full object-cover"
                            />
                            _            </div>
                    )}
                </div>
            );
        });
    };

    return (
        <main className="relative min-h-screen w-full bg-white overflow-hidden">
            <div
                ref={gridRef}
                className="absolute grid w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
                }}
            >
                {renderGrid()}
            </div>
        </main>
    );
};

export default Body;