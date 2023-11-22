import { useEffect, useRef } from "react"

export const useClickOutside = <T extends HTMLElement = HTMLElement>(fn: () => void) => {
    const ref = useRef<T>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            fn();
        };
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return ref;
}
