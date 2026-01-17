'use client';

/**
 * Terminal wrapper component - provides the terminal window frame
 * with title bar and buttons
 */
export default function Terminal({ title = 'terminal', path = '~', children }) {
    return (
        <div className="terminal">
            {/* Title Bar */}
            <div className="terminalHeader">
                <div className="terminalButtons">
                    <span className="terminalBtn close"></span>
                    <span className="terminalBtn minimize"></span>
                    <span className="terminalBtn maximize"></span>
                </div>
                <div className="terminalTitle">
                    <span>{title}</span>
                    <span className="terminalPath">{path}</span>
                </div>
                <div className="terminalHeaderRight"></div>
            </div>

            {/* Terminal Content */}
            <div className="terminalBody">
                {children}
            </div>
        </div>
    );
}
