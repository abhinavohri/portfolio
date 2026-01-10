'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function OrgDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orgSlug = params.org;
  
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get from sessionStorage (cached from main page)
    const cached = sessionStorage.getItem(`os-${orgSlug}`);
    if (cached) {
      setOrgData(JSON.parse(cached));
      setLoading(false);
    } else {
      // If not cached, redirect to home
      router.push('/');
    }
  }, [orgSlug, router]);

  if (loading || !orgData) {
    return (
      <div className="container">
        <main className="main orgDetailPage">
          <div className="prListLoading">
            {[1, 2, 3].map(i => (
              <div key={i} className="prItemSkeleton">
                <div className="skeleton"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const { owner, info, stats, prs } = orgData;

  return (
    <div className="container">
      <main className="main orgDetailPage">
        {/* Header: Back + Avatar + Name inline */}
        <div className="orgPageHeader">
          <Link href="/" className="backButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          {info?.avatar ? (
            <Image
              src={info.avatar}
              alt={info.name}
              width={42}
              height={42}
              className="orgAvatar"
            />
          ) : (
            <div className="orgLogo">
              <span className="orgLogoText">{owner.charAt(0)}</span>
            </div>
          )}
          <div className="orgPageTitle">
            <h1>{info?.name || owner}</h1>
            <span className="orgPageStats">
              {stats?.total || 0} PRs · {stats?.merged || 0} merged
            </span>
          </div>
        </div>

        {/* PR List */}
        <div className="prListSection">
          {prs && prs.length > 0 ? (
            <div className="prListGithub">
              {prs.map((pr) => (
                <a 
                  key={pr.id} 
                  href={pr.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="prItemGithub"
                >
                  {/* PR Icon */}
                  <div className={`prIcon ${pr.merged ? 'merged' : pr.state}`}>
                    {pr.merged ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"/>
                      </svg>
                    ) : pr.state === 'open' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 5.5a.75.75 0 0 1 .75.75v3.378a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 1 .75-.75Zm-2.03-5.28a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L9.561 4.5h1.189a.75.75 0 0 1 0 1.5H7.25L10.72 2.53l-.76-.53Z"/>
                      </svg>
                    )}
                  </div>
                  
                  {/* PR Content */}
                  <div className="prContent">
                    <span className="prTitleGithub">{pr.title}</span>
                    <span className="prMeta">
                      #{pr.number} · {pr.repo?.split('/')[1]}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="prListEmpty">No pull requests found</p>
          )}
        </div>
      </main>
    </div>
  );
}
