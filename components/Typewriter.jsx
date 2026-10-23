export default function Typewriter({ text, delay = 0 }) {
    return (
        <span className="terminalTextReveal" style={{ animationDelay: `${delay}ms` }}>
            {text}
        </span>
    );
}
