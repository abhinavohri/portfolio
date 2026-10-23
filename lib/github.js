import 'server-only';

const GITHUB_API = 'https://api.github.com';
const REVALIDATE_SECONDS = 3600;

function getHeaders() {
  const headers = { Accept: 'application/vnd.github.v3+json' };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function getGitHubJson(url, headers) {
  const response = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  return response.ok ? response.json() : null;
}

export async function getGitHubData(repos, author) {
  if (!repos?.length || !author) {
    return { orgs: [] };
  }

  const headers = getHeaders();

  try {
    const organizations = [...new Set(repos.map((repo) => repo.split('/')[0]))];
    const query = `author:${author} type:pr ${organizations.map((org) => `org:${org}`).join(' ')}`;
    const searchData = await getGitHubJson(
      `${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&per_page=100`,
      headers,
    );
    const pullRequests = searchData?.items || [];

    const pullRequestsByOrg = pullRequests.reduce((grouped, pullRequest) => {
      const [, , , organization, repository] = pullRequest.html_url.split('/');
      grouped[organization] ||= [];
      grouped[organization].push({
        id: pullRequest.id,
        number: pullRequest.number,
        title: pullRequest.title,
        url: pullRequest.html_url,
        state: pullRequest.state,
        merged: Boolean(pullRequest.pull_request?.merged_at),
        repo: `${organization}/${repository}`,
        created_at: pullRequest.created_at,
      });
      return grouped;
    }, {});

    const orgs = await Promise.all(organizations.map(async (owner) => {
      const orgPullRequests = pullRequestsByOrg[owner] || [];
      if (!orgPullRequests.length) {
        return null;
      }

      const orgRepos = repos.filter((repo) => repo.startsWith(`${owner}/`));
      const firstRepo = orgRepos[0];
      const [repoData, languageData] = await Promise.all([
        getGitHubJson(`${GITHUB_API}/repos/${firstRepo}`, headers),
        getGitHubJson(`${GITHUB_API}/repos/${firstRepo}/languages`, headers),
      ]);

      return {
        owner,
        repos: orgRepos,
        info: repoData ? {
          name: repoData.owner.login,
          fullName: repoData.full_name,
          description: repoData.description,
          avatar: repoData.owner.avatar_url,
          url: `https://github.com/${owner}`,
        } : { name: owner, description: '', avatar: '' },
        languages: Object.keys(languageData || {}).slice(0, 4),
        stats: {
          total: orgPullRequests.length,
          merged: orgPullRequests.filter((pullRequest) => pullRequest.merged).length,
          open: orgPullRequests.filter((pullRequest) => pullRequest.state === 'open').length,
          closed: orgPullRequests.filter((pullRequest) => pullRequest.state === 'closed' && !pullRequest.merged).length,
        },
        prs: orgPullRequests.sort((first, second) => new Date(second.created_at) - new Date(first.created_at)),
      };
    }));

    return { orgs: orgs.filter(Boolean) };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { orgs: [] };
  }
}
