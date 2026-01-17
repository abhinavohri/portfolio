'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Terminal from '@/components/Terminal';
import TerminalBlock from '@/components/TerminalBlock';

export default function OrgDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orgSlug = params.org;
  
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(`os-${orgSlug}`);
    if (cached) {
      setOrgData(JSON.parse(cached));
      setLoading(false);
    } else {
      router.push('/');
    }
  }, [orgSlug, router]);

  if (loading || !orgData) {
    return (
      <div className="terminalPage">
        <Terminal title="loading..." path="~/opensource">
          <TerminalBlock command="loading...">
            <div className="skeleton" style={{ height: 100 }}></div>
          </TerminalBlock>
        </Terminal>
      </div>
    );
  }

  const { owner, info, stats, prs } = orgData;

  return (
    <div className="terminalPage">
      <Terminal title={`${owner}`} path="~/opensource">
        {/* Back link */}
        <div className="terminalBlock">
          <Link href="/" className="cmdLine cmdLink">
            <span className="prompt">←</span>
            <span className="cmd">cd ..</span>
          </Link>
        </div>

        {/* Org Header */}
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

        {/* PR List */}
        <TerminalBlock command={`gh pr list --repo ${owner}/* --author me`}>
          {prs && prs.length > 0 ? (
            <div className="prList">
              {prs.map((pr) => (
                <a 
                  key={pr.id} 
                  href={pr.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="prItem"
                >
                  <span className={`prStatus ${pr.merged ? 'merged' : pr.state}`}>
                    {pr.merged ? '⬤' : pr.state === 'open' ? '○' : '⊘'}
                  </span>
                  <span className="prTitle">{pr.title}</span>
                  <span className="prRepo">#{pr.number} · {pr.repo?.split('/')[1]}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="outputText">No pull requests found</p>
          )}
        </TerminalBlock>

        {/* Cursor */}
        <TerminalBlock showCursor />
      </Terminal>
    </div>
  );
}
