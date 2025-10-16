import React, { useState, useEffect, useRef } from 'react';

// Import all necessary local images
import body1 from '../assets/images/body_1.jpeg';
import body2 from '../assets/images/body_2.jpeg';
import body3 from '../assets/images/body_3.jpeg';
import body4 from '../assets/images/body_4.jpeg';
import body5 from '../assets/images/body_5.jpeg';
import body6 from '../assets/images/body_6.jpeg';
import body7 from '../assets/images/body_7.jpeg';
import body8 from '../assets/images/body_8.jpg';

// If you installed via npm, you can uncomment the next line
// import gsap from 'gsap';

// --- Data provides 9 images for the 3x3 grid ---
const allCategories = [
    {
        name: 'Work & Commute',
        features: 'Laptop Backpacks, Totes, Briefcases',
        images: [body1, body2, body3, body4, body5, body6, body7, body8, body1]
    },
    {
        name: 'Day & Outings',
        features: 'Crossbody Bags, Bucket Bags, Small Backpacks',
        images: [body4, body5, body6, body7, body8, body1, body2, body3, body4]
    },
    {
        name: 'Evening & Events',
        features: 'Clutches, Evening Bags, Mini Bags',
        images: [body7, body8, body1, body2, body3, body4, body5, body6, body7]
    },
    {
        name: 'Travel & Weekend',
        features: 'Duffels, Weekenders, Travel Backpacks',
        images: [body2, body3, body4, body5, body6, body7, body8, body1, body2]
    },
];

const Category = () => {
    const [activeImages, setActiveImages] = useState(allCategories[0].images);
    const imageContainerRef = useRef(null);

    // This effect handles the GSAP animation for fading images in and out
    useEffect(() => {
        if (imageContainerRef.current && window.gsap) {
            const imageElements = imageContainerRef.current.querySelectorAll('img');

            window.gsap.to(imageElements, {
                opacity: 0,
                duration: 0.3,
                stagger: 0.04,
                ease: 'power2.inOut',
                onComplete: () => {
                    imageElements.forEach((img, index) => {
                        if (activeImages[index]) {
                            img.src = activeImages[index];
                        }
                    });
                    window.gsap.to(imageElements, {
                        opacity: 1,
                        duration: 0.3,
                        stagger: 0.04,
                        ease: 'power2.out',
                    });
                }
            });
        }
    }, [activeImages]);

    return (
        // MODIFIED: Added significant vertical padding (py-20) and changed flex direction
        <div className="p-4 sm:p-8 bg-white min-h-screen flex flex-col items-center justify-center font-sans py-20">

            {/* --- NEW: Main Heading Outside the Box --- */}
            <h1 className="text-4xl font-bold text-center tracking-widest uppercase mb-12">
                Category
            </h1>

            <div className="container mx-auto flex border border-black" style={{ height: '650px' }}>

                {/* --- Left Column: 3x3 Image Grid --- */}
                <div className="w-1/2 border-r border-black p-4 flex items-center justify-center" ref={imageContainerRef}>
                    <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
                        {activeImages.map((src, index) => (
                            <div key={index} className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                                <img
                                    src={src}
                                    alt={`Display ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Right Column: Navigation List (Heading Removed) --- */}
                <div className="w-1/2 flex flex-col">
                    {allCategories.map((category, index) => (
                        <div
                            key={category.name}
                            onMouseEnter={() => setActiveImages(category.images)}
                            className={`p-8 flex-1 flex flex-col justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-50 ${index !== allCategories.length - 1 ? 'border-b border-black' : ''}`}
                        >
                            <h2 className="text-2xl font-medium">{category.name}</h2>
                            {category.features && <p className="text-md text-gray-500 mt-2">{category.features}</p>}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Category;