import data from '@/data/data.json';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const projects = data.projects.map((project) => {
    const url = project.liveUrl || project.githubUrl;
    return `- ${url ? `[${project.name}](${url})` : project.name}: ${project.description}`;
  });
  const experience = data.experience.map((item) => (
    `- ${item.role} at ${item.company} (${item.startDate}–${item.endDate || 'Present'})`
  ));
  const links = data.socials.map((social) => `- ${social.platform}: ${social.url}`);

  const content = [
    `# ${data.name}`,
    '',
    `> ${data.description}`,
    '',
    '## Profile',
    `- Role: ${data.role}`,
    `- Portfolio: ${siteUrl.origin}`,
    `- GitHub: https://github.com/${data.openSource.username}`,
    `- Resume: ${siteUrl.origin}${data.resumeUrl}`,
    '',
    '## Skills',
    data.skills.join(', '),
    '',
    '## Experience',
    ...experience,
    '',
    '## Projects',
    ...projects,
    '',
    '## Links',
    ...links,
    '',
  ].join('\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
