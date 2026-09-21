'use client';

import { useState, useEffect } from 'react';
import OrgCard from './OrgCard';
import { fetchGitHubData } from '@/lib/github';

/**
 * Open Source Contributions Section
 * Fetches org data dynamically from GitHub
 */
export default function OpenSourceSection({ config }) {
  const { username, repos } = config;
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Check if we have cached data first
        const cacheKey = `os-orgs-${username}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
          const cachedOrgs = JSON.parse(cached);
          setOrgs(cachedOrgs);
          setLoading(false);
          return;
        }

        // No cache, fetch from API
        const data = await fetchGitHubData(repos, username);
        setOrgs(data.orgs || []);

        // Cache the orgs list
        if (data.orgs && data.orgs.length > 0) {
          sessionStorage.setItem(cacheKey, JSON.stringify(data.orgs));

          // Also cache individual orgs for detail pages
          data.orgs.forEach(org => {
            sessionStorage.setItem(`os-${org.owner.toLowerCase()}`, JSON.stringify(org));
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [repos, username]);

  // Don't render if no orgs with PRs
  if (!loading && orgs.length === 0) {
    return null;
  }

  const rankedOrgs = [...orgs].sort((firstOrg, secondOrg) => {
    const totalDifference = (secondOrg.stats?.total || 0) - (firstOrg.stats?.total || 0);
    if (totalDifference !== 0) {
      return totalDifference;
    }

    const mergedDifference = (secondOrg.stats?.merged || 0) - (firstOrg.stats?.merged || 0);
    if (mergedDifference !== 0) {
      return mergedDifference;
    }

    return firstOrg.owner.localeCompare(secondOrg.owner);
  });

  return (
    <section className="openSourceSection">
      <h2 className="sectionTitle">Open Source</h2>
      <div className="orgGrid">
        {loading ? (
          // Loading skeleton
          [1, 2, 3].map(i => (
            <div key={i} className="orgCard" style={{ opacity: 0.5 }}>
              <div className="orgCardHeader">
                <div className="skeleton" style={{ width: 42, height: 42, borderRadius: 10 }}></div>
                <div className="skeleton" style={{ width: 100, height: 20 }}></div>
              </div>
            </div>
          ))
        ) : (
          rankedOrgs.map((org) => (
            <OrgCard
              key={org.owner}
              org={org}
            />
          ))
        )}
      </div>
    </section>
  );
}
