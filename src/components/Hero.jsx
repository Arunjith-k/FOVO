import React from 'react';

// Make sure the path is correct relative to this component file.
import heroVideo from '../assets/videos/hero.mp4';

const Hero = () => {
    const positionY = '3%';
    const positionX = '5%';

    return (
        <div className="flex h-[85vh] w-full items-center justify-center bg-white mt-24 mb-20">
            <div className="relative h-full w-full">

                {/* Video Container */}
                <div
                    className="absolute overflow-hidden"
                    style={{ top: positionY, bottom: positionY, left: positionX, right: positionX }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    >
                        <source src={heroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Lines, Squares, and Content Wrapper */}
                <div className="relative z-10 h-full w-full">
                    {/* Lines */}
                    <div className="absolute left-0 right-0 h-px scale-y-50 bg-gray-400" style={{ top: positionY }}></div>
                    <div className="absolute left-0 right-0 h-px scale-y-50 bg-gray-400" style={{ bottom: positionY }}></div>
                    <div className="absolute bottom-0 w-px scale-x-50 bg-gray-400" style={{ top: positionY, left: positionX }}></div>
                    <div className="absolute bottom-0 w-px scale-x-50 bg-gray-400" style={{ top: positionY, right: positionX }}></div>

                    {/* Pixel Squares at Intersections */}
                    <div className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-gray-400" style={{ left: positionX, top: positionY }}></div>
                    <div className="absolute h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 bg-gray-400" style={{ right: positionX, top: positionY }}></div>
                    <div className="absolute h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 bg-gray-400" style={{ left: positionX, bottom: positionY }}></div>
                    <div className="absolute h-1.5 w-1.5 translate-x-1/2 translate-y-1/2 bg-gray-400" style={{ right: positionX, bottom: positionY }}></div>

                    {/* Content Container (MODIFIED) */}
                    <div
                        className="absolute flex items-start justify-start p-8 md:p-12 lg:p-16"
                        style={{ top: positionY, bottom: positionY, left: positionX, right: positionX }}
                    >
                        <div className="text-left">
                            <h1 className="text-4xl font-bold md:text-6xl top-2 text-white mix-blend-difference">FOVO</h1>
                            <p className="mt-4 text-lg text-white mix-blend-difference">CRAFTING MADE SIMPLE</p>
                            <div className="mt-8">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;