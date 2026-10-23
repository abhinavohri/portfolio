import art from '@/data/ascii-art.json';

export default function AsciiArt() {
  return (
    <pre className="asciiArt" aria-hidden="true">
      {art.lines.map((line, index) => (
        <span key={index} style={{ color: art.colors[index % art.colors.length] }}>
          {line}
        </span>
      ))}
    </pre>
  );
}
