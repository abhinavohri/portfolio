'use client';

/**
 * AsciiArt - Colorful filled ASCII art component
 * Uses block characters (█) for filled look like Gemini CLI
 */

// Block-style ASCII art for "ABHINAV"
const ABHINAV_ART = [
    '█████╗ ██████╗ ██╗  ██╗██╗███╗   ██╗ █████╗ ██╗   ██╗',
    '██╔══██╗██╔══██╗██║  ██║██║████╗  ██║██╔══██╗██║   ██║',
    '███████║██████╔╝███████║██║██╔██╗ ██║███████║██║   ██║',
    '██╔══██║██╔══██╗██╔══██║██║██║╚██╗██║██╔══██║╚██╗ ██╔╝',
    '██║  ██║██████╔╝██║  ██║██║██║ ╚████║██║  ██║ ╚████╔╝ ',
    '╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  ',
];

// Block-style ASCII art for "OHRI"
const OHRI_ART = [
    ' ██████╗ ██╗  ██╗██████╗ ██╗',
    '██╔═══██╗██║  ██║██╔══██╗██║',
    '██║   ██║███████║██████╔╝██║',
    '██║   ██║██╔══██║██╔══██╗██║',
    '╚██████╔╝██║  ██║██║  ██║██║',
    ' ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝',
];

// Cyan/Teal gradient - cleaner, more professional
const COLORS = [
    '#22d3ee', // Bright Cyan
    '#06b6d4', // Cyan
    '#14b8a6', // Teal
    '#10b981', // Emerald
    '#34d399', // Light Emerald
    '#6ee7b7', // Mint
];

export default function AsciiArt({ showSecondName = true }) {
    return (
        <pre className="asciiArt">
            {ABHINAV_ART.map((line, i) => (
                <span key={`a-${i}`} style={{ color: COLORS[i % COLORS.length] }}>
                    {line}
                </span>
            ))}
            {showSecondName && OHRI_ART.map((line, i) => (
                <span key={`o-${i}`} style={{ color: COLORS[(i + 2) % COLORS.length] }}>
                    {line}
                </span>
            ))}
        </pre>
    );
}
