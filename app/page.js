import data from '@/data/data.json';
import OpenSourceSection from '@/components/OpenSourceSection';
import TechIcon from '@/components/TechIcon';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import AsciiArt from '@/components/AsciiArt';
import TerminalNavbar from '@/components/TerminalNavbar';

export default function Home() {
  return (
    <div className="terminalPage">
      <Terminal title="abhinav@portfolio" path="~/about">
        <TerminalNavbar />
        {/* Welcome / whoami */}
        <TerminalBlock command="whoami">
          <AsciiArt />
          <p className="outputText">{data.tagline}</p>
        </TerminalBlock>

        {/* About */}
        <TerminalBlock command="cat about.txt" id="about">
          <p className="outputText">{data.description}</p>
        </TerminalBlock>

        {/* Tech Stack */}
        <TerminalBlock command="ls skills/" id="skills">
          <div className="terminalSkills">
            {data.techStack.map((tech) => (
              <TechIcon key={tech} tech={tech} showLabel={true} variant="compact" />
            ))}
          </div>
        </TerminalBlock>

        {/* Links */}
        <TerminalBlock command="cat links.txt">
          <div className="terminalLinks">
            <a href={data.resumeUrl} className="terminalLink" download>
              <span className="linkIcon">📄</span> resume.pdf
            </a>
            <a href={`mailto:${data.email}`} className="terminalLink">
              <span className="linkIcon">📧</span> {data.email}
            </a>
            {data.socials?.map((social) => (
              <a 
                key={social.platform} 
                href={social.url} 
                className="terminalLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="linkIcon">🔗</span> {social.platform}
              </a>
            ))}
          </div>
        </TerminalBlock>

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <TerminalBlock command="cat experience.json | jq" id="experience">
            {data.experience.map((exp, index) => (
              <div key={index} className="expEntry">
                <div className="expHeader">
                  <span className="expCompany">{exp.company}</span>
                  {exp.current && <span className="expCurrent">[ACTIVE]</span>}
                </div>
                <div className="expMeta">
                  <span className="expRole">{exp.role}</span>
                  <span className="expDates">{exp.startDate} → {exp.endDate || 'Present'}</span>
                </div>
                {exp.location && <div className="expLocation">📍 {exp.location}</div>}
                {exp.tools && (
                  <div className="expTools">
                    {exp.tools.map((tool) => (
                      <TechIcon key={tool} tech={tool} showLabel={true} variant="badge" />
                    ))}
                  </div>
                )}
                {exp.highlights && (
                  <ul className="expHighlights">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>- {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </TerminalBlock>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <TerminalBlock command="ls -la projects/" id="projects">
            <div className="projectsTable">
              <div className="projectsHeader">
                <span>NAME</span>
                <span>DESCRIPTION</span>
                <span>STACK</span>
              </div>
              {data.projects.map((project, index) => (
                <div key={index} className="projectRow">
                  <span className="projectName">
                    {project.name}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projectIcon">↗</a>}
                  </span>
                  <span className="projectDesc">{project.description}</span>
                  <span className="projectStack">{project.techStack?.join(', ')}</span>
                </div>
              ))}
            </div>
          </TerminalBlock>
        )}

        {/* Open Source */}
        {data.openSource && data.openSource.repos && data.openSource.repos.length > 0 && (
          <TerminalBlock command={`gh search prs --author ${data.openSource.username}`} id="opensource">
            <OpenSourceSection config={data.openSource} />
          </TerminalBlock>
        )}

        {/* Prompt cursor */}
        <TerminalBlock showCursor />
      </Terminal>
    </div>
  );
}
