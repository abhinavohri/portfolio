import Image from 'next/image';
import data from '@/data/data.json';
import avatar from '@/data/assets/avatar.png';
import OpenSourceSection from '@/components/OpenSourceSection';
import TechIcon from '@/components/TechIcon';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import AsciiArt from '@/components/AsciiArt';
import ContributionChart from '@/components/ContributionChart';
import TerminalNavbar from '@/components/TerminalNavbar';
import Typewriter from '@/components/Typewriter';
import { siteUrl } from '@/lib/site';

export default function Home() {
  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: siteUrl.origin,
    mainEntity: {
      '@id': `${siteUrl.origin}/#person`,
      '@type': 'Person',
      name: data.name,
      alternateName: data.openSource.username,
      description: data.description,
      image: new URL(avatar.src, siteUrl).toString(),
      url: siteUrl.origin,
      jobTitle: data.role,
      knowsAbout: data.skills,
      sameAs: data.socials.map((social) => social.url),
      worksFor: data.experience
        .filter((experience) => experience.current)
        .map((experience) => ({ '@type': 'Organization', name: experience.company })),
    },
  };

  return (
    <main className="terminalPage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, '\\u003c') }}
      />
      <Terminal title={`${data.openSource.username}@portfolio`} path="~/about">
        <TerminalNavbar />
        {/* Welcome / whoami */}
        <TerminalBlock command="whoami">
          <div className="heroIdentity">
            <div className="heroCopy">
              <AsciiArt />
              <h1 className="roleContainer">
                <span className="srOnly">{data.name}. </span>
                <span className="rolePrefix">Role:</span> <span className="roleText">{data.role}</span>
              </h1>
              <p className="outputText">
                <Typewriter text={data.tagline} delay={500} />
              </p>
            </div>
            <Image
              src={avatar}
              alt={`Pixel art avatar of ${data.name} working at a laptop`}
              className="pixelAvatar"
              width={240}
              height={200}
              priority
            />
          </div>
        </TerminalBlock>

        {/* About */}
        <TerminalBlock command="cat about.txt" id="about">
          <p className="outputText">
             <Typewriter text={data.description} delay={1000} />
          </p>
        </TerminalBlock>

        {/* Tech Stack */}
        <TerminalBlock command="ls skills/" id="skills">
          <div className="terminalSkills">
            {data.skills.map((tech) => (
              <TechIcon key={tech} tech={tech} showLabel variant="compact" />
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
                  <div className="projectIdentity">
                    <span className="projectName">{project.name}</span>
                    {(project.githubUrl || project.liveUrl) && (
                      <div className="projectLinks">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projectLink"
                            aria-label={`View ${project.name} source code on GitHub`}
                          >
                            [github] ↗
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projectLink projectLiveLink"
                            aria-label={`Open the live ${project.name} demo`}
                          >
                            [live demo] ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
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

        <TerminalBlock
          command={`curl github.com/users/${data.openSource.username}/contributions`}
          id="github-activity"
        >
          <ContributionChart
            username={data.openSource.username}
            contributionsLastYear={data.openSource.contributionsLastYear}
          />
        </TerminalBlock>

        <TerminalBlock command={`contact --email ${data.email}`} id="contact">
          <div className="contactCta">
            <p className="outputText">Have a project or role in mind? Send me an email.</p>
            <a
              href={`mailto:${data.email}?subject=Portfolio%20inquiry`}
              className="contactButton"
            >
              Send email ↗
            </a>
          </div>
        </TerminalBlock>

        {/* Prompt cursor */}
        <TerminalBlock showCursor />
      </Terminal>
    </main>
  );
}
