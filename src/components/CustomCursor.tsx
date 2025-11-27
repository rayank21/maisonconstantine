import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the cursor (32px width / 2)
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'BUTTON' ||
                (e.target as HTMLElement).tagName === 'A' ||
                (e.target as HTMLElement).closest('button') ||
                (e.target as HTMLElement).closest('a') ||
                (e.target as HTMLElement).classList.contains('cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <motion.div
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center justify-center"
            >
                {/* Simplified Cursor - No heavy blur/blend modes */}
                <div className="w-4 h-4 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />

                {/* Optional: Keep logo if it's small and optimized, otherwise remove for max performance */}
                {/* <img src="/images/logo-fox.png" ... /> */}
            </motion.div>
        </motion.div>
    );
};
