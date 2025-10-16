import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Your Local Image Imports ---
import body1 from '../assets/images/body_1.jpeg';
import body2 from '../assets/images/body_2.jpeg';
import body3 from '../assets/images/body_3.jpeg';
// Added a fourth image for the 2x2 grid, you can replace this with another import
import body4 from '../assets/images/body_4.jpeg';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- Sample Data for Bags (4 items for a 2x2 grid) ---
const newArrivals = [
    {
        id: 1,
        name: 'The Urban Voyager',
        category: 'Backpack',
        image: body1, // Using your local import directly
    },
    {
        id: 2,
        name: 'The Minimalist Tote',
        category: 'Tote Bag',
        image: body2,
    },
    {
        id: 3,
        name: 'The Weekender Duffel',
        category: 'Duffel Bag',
        image: body3,
    },
    {
        id: 4,
        name: 'The Compact Courier',
        category: 'Sling Bag',
        image: body4, // Added a fourth item for the grid
    },
];

const Arrival = () => {
    const componentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the text content (the header)
            gsap.from('.section-header', {
                opacity: 0,
                x: -100,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Animate the product grid items with scrub
            gsap.from('.product-card', {
                opacity: 0,
                scale: 0.9,
                y: 50,
                ease: 'power3.out',
                stagger: 0.2, // Adds a slight delay between each card's animation
                scrollTrigger: {
                    trigger: '.product-grid-container',
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 1.5, // Smoothly ties the animation to the scrollbar
                },
            });
        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="bg-stone-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* --- MASTER GRID CONTAINER --- */}
                {/* On large screens, this is a 3-column grid. 1 for text, 2 for images. */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 items-center">

                    {/* --- GRID ITEM 1: Section Header --- */}
                    <div className="section-header lg:col-span-1 text-center lg:text-left mb-12 lg:mb-0">
                        <h2 className="text-sm font-semibold text-indigo-600 tracking-widest uppercase">
                            Fresh Drops
                        </h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            New Arrivals
                        </p>
                        <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-gray-600">
                            Discover the latest in style and function, crafted for the modern journey and designed to fit seamlessly into your life.
                        </p>
                        <button className="mt-8 inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-md hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                            Explore All Collections
                        </button>
                    </div>

                    {/* --- GRID ITEM 2: Nested Grid for Product Images --- */}
                    <div className="product-grid-container lg:col-span-2">
                        {/* This is a 2x2 grid for the four product images */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {newArrivals.map((item) => (
                                <div key={item.id} className="product-card group relative rounded-lg overflow-hidden shadow-lg">
                                    {/* Using aspect-ratio to keep images square and consistent */}
                                    <div className="aspect-w-1 aspect-h-1">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Overlay for text content */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                                        <p className="text-xs sm:text-sm font-medium opacity-80">{item.category}</p>
                                        <h3 className="text-base sm:text-xl font-bold">{item.name}</h3>
                                        <a href="#" className="text-sm font-semibold mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            View Details &rarr;
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Arrival;