'use client';

import Link from 'next/link';
import Image from 'next/image';
import TechIcon from './TechIcon';

/**
 * Org card with data fetched from GitHub
 * Shows: avatar, name, description, stats, languages
 */
export default function OrgCard({ org }) {
  const { owner, info, stats, languages } = org;

  return (
    <Link
      href={`/opensource/${encodeURIComponent(owner.toLowerCase())}`}
      className="orgCard"
    >
      {/* Header with avatar and name */}
      <div className="orgCardHeader">
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
        <h3 className="orgName">{info?.name || owner}</h3>
      </div>

      {/* Description */}
      {info?.description && (
        <p className="orgDescription">{info.description}</p>
      )}

      {/* Stats Row */}
      <div className="orgStats">
        <div className="orgStatItem" title="Total PRs">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="statIcon">
            <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
          </svg>
          <span className="orgStatValue">{stats?.total || 0}</span>
          <span className="orgStatLabel">PRs</span>
        </div>

        <div className="orgStatItem merged" title="Merged PRs">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="statIcon mergedIcon">
            <path d="M5 3.254V3.25v.005a.75.75 0 1 1 0-.005zm.45 1.9a2.25 2.25 0 1 0-1.95.218v5.256a2.25 2.25 0 1 0 1.5 0V7.123A5.735 5.735 0 0 0 9.25 9h1.378a2.251 2.251 0 1 0 0-1.5H9.25a4.25 4.25 0 0 1-3.8-2.346zM12.75 9a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-8.5 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
          </svg>
          <span className="orgStatValue">{stats?.merged || 0}</span>
        </div>
      </div>

      {/* Languages/Tech Stack from GitHub */}
      {languages && languages.length > 0 && (
        <div className="orgTechStack">
          {languages.map((lang) => (
            <TechIcon
              key={lang}
              tech={lang.toLowerCase()}
              showLabel={false}
              variant="compact"
            />
          ))}
        </div>
      )}

      {/* View Details Footer */}
      <div className="orgCardFooter">
        <span className="viewDetails">View contributions</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="arrowIcon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}
