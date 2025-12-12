'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseFollower() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            setIsVisible(true);
        };

        const handleMouseDown = () => document.body.classList.add('cursor-clicked');
        const handleMouseUp = () => document.body.classList.remove('cursor-clicked');

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            />
            <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block">
                <style jsx global>{`
          body {
            cursor: none;
          }
          a, button, [role="button"] {
            cursor: none;
          }
          a:hover ~ .cursor-dot, button:hover ~ .cursor-dot {
            transform: scale(1.5);
            background-color: white;
          }
        `}</style>
            </div>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: useSpring(useMotionValue(-100), { damping: 50, stiffness: 400 }), // Tighter spring for the dot
                    y: useSpring(useMotionValue(-100), { damping: 50, stiffness: 400 })
                }}
                ref={(ref) => {
                    if (!ref) return;
                    const moveDot = (e: MouseEvent) => {
                        ref.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
                    };
                    window.addEventListener('mousemove', moveDot);
                }}
            />
        </>
    );
}
