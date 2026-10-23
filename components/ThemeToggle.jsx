'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function getPreferredTheme() {
    if (typeof window === 'undefined') {
        return false;
    }

    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(getPreferredTheme);
    const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
    }, [isDark, mounted]);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    if (!mounted) {
        return <div className="themeTogglePlaceholder" />;
    }

    return (
        <button
            className="terminalThemeToggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                // Sun icon for light mode
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ) : (
                // Moon icon for dark mode
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            )}
        </button>
    );
}
