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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="statIcon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          <span className="orgStatValue">{stats?.total || 0}</span>
          <span className="orgStatLabel">PRs</span>
        </div>

        <div className="orgStatItem merged" title="Merged PRs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="statIcon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="orgStatValue">{stats?.merged || 0}</span>
          <span className="orgStatLabel">Merged</span>
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
