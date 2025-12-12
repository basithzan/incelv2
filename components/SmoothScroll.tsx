'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {

    // Custom easing function for "buttery" feel (ExpoOut)
    const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const options = {
        duration: 1.2,
        easing: easing,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    };

    return (
        <ReactLenis root options={options}>
            {children}
        </ReactLenis>
    );
}
