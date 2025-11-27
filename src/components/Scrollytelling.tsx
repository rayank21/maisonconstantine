import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`min-h-screen flex flex-col justify-center items-center p-12 ${className}`}>
        {children}
    </div>
);

const ParallaxImage = ({ src, alt, speed = 1 }: { src: string; alt: string; speed?: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={ref} className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-sm my-12">
            <motion.img
                style={{ y }}
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-[140%] object-cover opacity-60"
            />
        </div>
    );
};

const RevealText = ({ text }: { text: string }) => {
    return (
        <p className="text-2xl md:text-4xl font-serif text-[#F5F5F5] leading-relaxed text-center max-w-4xl">
            {text.split(" ").map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0.1, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="inline-block mr-3"
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
};

export const Scrollytelling = () => {
    return (
        <div className="bg-[#050505] text-[#F5F5F5]">
            <Section>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-9xl font-serif text-[#D4AF37] mb-8 text-center"
                >
                    L'ESPRIT
                </motion.h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-sm">Scroll pour découvrir</p>
            </Section>

            <Section>
                <RevealText text="Constantine n'est pas juste une ville. C'est une mémoire gravée dans la pierre." />
            </Section>

            <Section>
                <ParallaxImage src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop" alt="Architecture Constantine" />
                <RevealText text="Entre les ponts suspendus et les gorges millénaires, nous puisons notre inspiration." />
            </Section>

            <Section>
                <RevealText text="Le streetwear rencontre l'héritage. Le béton rencontre l'or." />
                <ParallaxImage src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop" alt="Fashion Texture" speed={1.5} />
            </Section>

            <Section>
                <RevealText text="Chaque pièce raconte une histoire. Celle d'une élégance intemporelle, forgée dans la modernité." />
            </Section>

            <Section className="pb-32">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-6">MAISON CONSTANTINE</h2>
                    <p className="text-white/50 font-mono text-sm">Est. 2026</p>
                </motion.div>
            </Section>
        </div>
    );
};
