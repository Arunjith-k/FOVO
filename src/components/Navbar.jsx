// src/components/Navbar.jsx

import React from 'react';

// Icon components remain the same
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const ChevronDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const Navbar = () => {
    return (
        // Added bg-white/75 and backdrop-blur-md for the glass effect
        <header className="fixed top-0 left-0 w-full z-50 bg-white/75 backdrop-blur-md text-black">
            <nav className="flex items-center justify-between text-xs font-medium tracking-wider uppercase border-b border-gray-200/50 px-4 py-4">
                {/* Left Section - Simplified */}
                <div className="flex items-center">
                    <a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors">
                        <span className="text-lg leading-none pb-1">●</span>
                        <span>Menu</span>
                    </a>
                </div>

                {/* Center Section (Logo/Home) */}
                <div>
                    <a href="#" className="text-sm font-bold tracking-widest hover:text-gray-500 transition-colors">HOME</a>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    <a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors">
                        <span>Search</span>
                        <SearchIcon />
                    </a>
                    <div className="h-5 border-l border-gray-200"></div>
                    <a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors">
                        <span>ZAR</span>
                        <ChevronDownIcon />
                    </a>
                    <div className="h-5 border-l border-gray-200"></div>
                    <a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors">
                        <span className="text-lg leading-none pb-1">●</span>
                        <span>Cart</span>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;