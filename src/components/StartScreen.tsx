import { motion } from 'framer-motion';
import { useState } from 'react';

interface StartScreenProps {
    onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleClick = () => {
        setIsExiting(true);
        setTimeout(onStart, 800); // Wait for exit animation
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white cursor-pointer"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            onClick={handleClick}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-center"
            >
                <h1 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-4">
                    Maison Constantine
                </h1>
                <p className="text-xs md:text-sm text-white/40 tracking-widest uppercase">
                    Cliquer pour entrer
                </p>
            </motion.div>
        </motion.div>
    );
};
