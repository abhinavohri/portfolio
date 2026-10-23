import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';
import { getGitHubData } from '@/lib/github';

const organizations = [...new Set(data.openSource.repos.map((repo) => repo.split('/')[0]))];

export const revalidate = 3600;

export function generateStaticParams() {
  return organizations.map((org) => ({ org: org.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { org } = await params;
  const organization = organizations.find((name) => name.toLowerCase() === org.toLowerCase());

  return {
    title: organization ? `${organization} contributions | ${data.name}` : `Open-source contributions | ${data.name}`,
    description: organization
      ? `Open-source pull requests by ${data.name} for ${organization}.`
      : `Open-source contributions by ${data.name}.`,
  };
}

export default async function OrgDetailPage({ params }) {
  const { org: orgSlug } = await params;
  const organization = organizations.find((name) => name.toLowerCase() === orgSlug.toLowerCase());

  if (!organization) {
    notFound();
  }

  const { orgs } = await getGitHubData(data.openSource.repos, data.openSource.username);
  const orgData = orgs.find((org) => org.owner.toLowerCase() === orgSlug.toLowerCase()) || {
    owner: organization,
    info: { name: organization, avatar: '' },
    stats: {},
    prs: [],
  };
  const { owner, info, stats, prs } = orgData;

  return (
    <div className="terminalPage">
      <Terminal title={owner} path="~/opensource">
        <div className="terminalBlock">
          <Link href="/" className="cmdLine cmdLink">
            <span className="prompt">←</span>
            <span className="cmd">cd ..</span>
          </Link>
        </div>

        <TerminalBlock command={`cat ${owner.toLowerCase()}.json | jq '.info'`}>
          <div className="orgDetailHeader">
            {info?.avatar ? (
              <Image
                src={info.avatar}
                alt={info.name}
                width={32}
                height={32}
                className="orgAvatar"
              />
            ) : (
              <div className="orgLogo">
                <span>{owner.charAt(0)}</span>
              </div>
            )}
            <div className="orgDetailInfo">
              <span className="orgDetailName">{info?.name || owner}</span>
              <span className="orgDetailStats">
                {stats?.total || 0} PRs · {stats?.merged || 0} merged
              </span>
            </div>
          </div>
        </TerminalBlock>

        <TerminalBlock command={`gh pr list --repo ${owner}/* --author ${data.openSource.username}`}>
          {prs.length ? (
            <div className="prList">
              {prs.map((pullRequest) => (
                <a
                  key={pullRequest.id}
                  href={pullRequest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prItem"
                >
                  <span className={`prStatus ${pullRequest.merged ? 'merged' : pullRequest.state}`}>
                    {pullRequest.merged ? '⬤' : pullRequest.state === 'open' ? '○' : '⊘'}
                  </span>
                  <span className="prTitle">{pullRequest.title}</span>
                  <span className="prRepo">#{pullRequest.number} · {pullRequest.repo?.split('/')[1]}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="outputText">GitHub contribution data is temporarily unavailable.</p>
          )}
        </TerminalBlock>

        <TerminalBlock showCursor />
      </Terminal>
    </div>
  );
}
