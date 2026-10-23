import OrgCard from './OrgCard';
import { getGitHubData } from '@/lib/github';

export default async function OpenSourceSection({ config }) {
  const { username, repos } = config;
  const { orgs } = await getGitHubData(repos, username);

  if (!orgs.length) {
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
    <section>
      <div className="orgGrid">
        {rankedOrgs.map((org) => (
          <OrgCard key={org.owner} org={org} />
        ))}
      </div>
    </section>
  );
}
