'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Heart, Pill, Hospital, Activity } from 'lucide-react';

const wordVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.6,
        },
    }),
};

// Types pour les mots spéciaux
interface Word {
    text: string;
    color?: string; // ex: 'text-green-500', 'text-blue-600'
    icon?: React.ComponentType<any>; // Icône lucide-react
    iconBg?: string; // ex: 'bg-green-100'
    iconColor?: string; // ex: 'text-green-600'
}

const AnimatedWords = ({
    words,
    isVisible,
    totalWords,
    scrollProgress
}: {
    words: (string | Word)[];
    isVisible: boolean;
    totalWords: number;
    scrollProgress: number;
}) => {
    // Calculer le progrès de l'apparition des mots (0 à 1)
    const textAnimationDuration = totalWords * 0.12 + 0.6; // délai + durée du dernier mot
    const textAnimationEnd = 0.5; // Quand commence l'apparition des icônes (50% du scroll)

    return (
        <span className="inline-block">
            {words.map((wordData, i) => {
                const wordObj = typeof wordData === 'string'
                    ? { text: wordData }
                    : wordData;

                const Icon = wordObj.icon;
                const isIconPosition = !!Icon;

                return (
                    <motion.span
                        key={i}
                        variants={wordVariants}
                        custom={i}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        className={`inline-flex items-center gap-1 mr-3 ${wordObj.color ? 'text-black' : 'text-black/40'}`}
                    >
                        {/* Texte du mot */}
                        {wordObj.text}

                        {/* Icône circulaire qui apparaît après le texte */}
                        {isIconPosition && Icon && isVisible && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0, width: 0, height: 0, overflow: 'hidden' }}
                                animate={{
                                    opacity: scrollProgress > textAnimationEnd ? 1 : 0,
                                    scale: scrollProgress > textAnimationEnd ? 1 : 0,
                                    width: scrollProgress > textAnimationEnd ? '55px' : 0,
                                    height: scrollProgress > textAnimationEnd ? '55px' : 0,
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${wordObj.iconBg || 'bg-blue-100'}`}
                            >
                                <Icon className={`w-4 h-4 ${wordObj.iconColor || 'text-blue-600'}`} />
                            </motion.span>
                        )}
                    </motion.span>
                );
            })}
        </span>
    );
};

const Info = () => {
    const { ref, isInView } = useScrollAnimation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const textWords: (string | Word)[] = [
        "Our",
        "platform",
        { text: "helps", color: 'text-black/50', icon: Heart, iconBg: 'bg-green-500', iconColor: 'text-black font-extrabold' },
        "you",
        "to",
        { text: "locate", color: 'text-blue-600', icon: Activity, iconBg: 'bg-blue-500', iconColor: 'text-white' },
        "quickly",
        "the",
        { text: "medications", color: 'text-purple-600', icon: Pill, iconBg: 'bg-purple-500', iconColor: 'text-white' },
        "you",
        "need,",
        "with",
        "detailed",
        "information",
        "on",
        "availability",
        "and",
        "our",
        { text: "partner pharmacies", color: 'text-orange-600', icon: Hospital, iconBg: 'bg-amber-500', iconColor: 'text-black' },
        "."
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const elementHeight = containerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            const scrollStart = windowHeight;
            const scrollEnd = -elementHeight;
            const progress = Math.max(0, Math.min(1, (rect.top - scrollStart) / (scrollEnd - scrollStart)));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <>
            <div
                ref={containerRef}
                className='w-full min-h-[60vh] flex items-center justify-center px-8 py-24'
            >
                <motion.div
                    ref={ref}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className='max-w-5xl w-full'
                >
                    <p className='text-5xl text-black/30 text-center leading-relaxed'>
                        <AnimatedWords
                            words={textWords}
                            isVisible={isInView}
                            totalWords={textWords.length}
                            scrollProgress={scrollProgress}
                        />
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default Info;
