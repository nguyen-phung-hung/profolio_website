import { useEffect, useState } from 'react';

function useOnScreen(ref, threshold) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                //Update the state with the intersection entry

                setIntersecting(entry?.isIntersecting ?? false);
            },
            {
                rootMargin: '0px',
                threshold: threshold ?? 0.5,
            },
        );

        const target = ref.current;

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [ref]);

    return isIntersecting;
}

export default useOnScreen;
