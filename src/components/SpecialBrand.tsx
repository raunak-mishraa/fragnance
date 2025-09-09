"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function ProductComparison() {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [sliderPos, setSliderPos] = useState(50); // track percentage for button visibility
    let animFrame: number;

    const updateSlider = (x: number) => {
        if (!containerRef.current || !maskRef.current || !lineRef.current || !buttonRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newPos = ((x - rect.left) / rect.width) * 100;
        if (newPos < 0) newPos = 0;
        if (newPos > 100) newPos = 100;

        // Move DOM elements
        maskRef.current.style.width = `${newPos}%`;
        lineRef.current.style.left = `${newPos}%`;
        buttonRef.current.style.left = `${newPos}%`;

        setSliderPos(newPos);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
        cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(() => {
            let clientX = 0;
            if ("touches" in e) {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            updateSlider(clientX);
        });
    };

    useEffect(() => {
        const handleDown = () => {
            window.addEventListener("mousemove", handleMove);
            window.addEventListener("touchmove", handleMove);
        };

        const handleUp = () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
        };

        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);
        window.addEventListener("touchstart", handleDown);
        window.addEventListener("touchend", handleUp);

        return () => {
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchstart", handleDown);
            window.removeEventListener("touchend", handleUp);
        };
    }, []);

    return (
        <div className="w-full bg-gray-100 py-10 flex flex-col items-center">
            <h2 className="text-xl tracking-[0.3em] mb-6">NASHWA / NASHWAN</h2>

            <div
                ref={containerRef}
                className="relative w-[800px] h-[400px] overflow-hidden rounded-xl shadow-lg select-none"
            >
                {/* Right Image */}
                <Image
                    src="/assets/test/right.webp"
                    alt="Right Product"
                    fill
                    className="object-cover"
                />

                {/* Left Image Mask */}
                <div
                    ref={maskRef}
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{ width: "50%" }}
                >
                    <Image
                        src="/assets/test/left.webp"
                        alt="Left Product"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Slider Line */}
                <div
                    ref={lineRef}
                    className="absolute top-0 bottom-0 w-[2px] bg-white"
                    style={{ left: "50%" }}
                />

                {/* Slider Button */}
                <div
                    ref={buttonRef}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
             bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center"
                    style={{ left: "50%" }}
                >
                    <span className="text-black text-lg font-bold">↔</span>
                </div>

                {/* Left Button - only when left side is bigger */}
                <div
                    className={`absolute bottom-5 left-5 transition-opacity duration-500 ${sliderPos > 50 ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <button className="bg-white px-4 py-2 shadow-md text-sm tracking-widest">
                        NASHWA <br /> SHOP NOW
                    </button>
                </div>

                {/* Right Button - only when right side is bigger */}
                <div
                    className={`absolute bottom-5 right-5 transition-opacity duration-500 ${sliderPos < 50 ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <button className="bg-white px-4 py-2 shadow-md text-sm tracking-widest">
                        NASHWAN <br /> SHOP NOW
                    </button>
                </div>
            </div>
        </div>
    );
}
