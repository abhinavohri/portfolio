'use client';

import { useState } from 'react';

export default function ContributionChart({ username, contributionsLastYear }) {
  const [status, setStatus] = useState('loading');

  return (
    <a
      href={`https://github.com/${username}?tab=overview`}
      className="contributionChart"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${username}'s GitHub profile`}
    >
      <span className="contributionChartImage" aria-busy={status === 'loading'}>
        {status === 'loading' && (
          <span className="contributionChartSkeleton skeleton" aria-hidden="true" />
        )}
        {status === 'error' && (
          <span className="contributionChartError">Contribution chart unavailable.</span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`${username}'s GitHub contribution chart for the last year`}
          width="663"
          height="104"
          loading="lazy"
          className={status === 'loaded' ? 'isLoaded' : ''}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      </span>
      <span className="contributionFooter">
        <span>{contributionsLastYear.toLocaleString('en-US')} contributions in the last year</span>
        <span className="contributionLegend" aria-label="Contribution activity from less to more">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={`contributionLevel contributionLevel${level}`} aria-hidden="true" />
          ))}
          <span>More</span>
        </span>
      </span>
    </a>
  );
}
