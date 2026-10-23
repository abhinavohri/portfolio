/**
 * GitHub API utilities - uses server-side API route
 */

let pendingRequest;

/**
 * Fetch all org data with PRs
 * @param {Array<string>} repos - Array of "owner/repo" strings
 * @param {string} author - GitHub username
 * @returns {Promise<Object>} Orgs with their data
 */
export async function fetchGitHubData(repos, author) {
  const cacheKey = `os-orgs-${author}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        return { orgs: JSON.parse(cached) };
      } catch {
        sessionStorage.removeItem(cacheKey);
      }
    }

    const params = new URLSearchParams({
      repos: repos.join(','),
      author: author,
    });

    pendingRequest ??= fetch(`/api/github?${params}`).then(async (response) => {
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      return response.json();
    }).finally(() => {
      pendingRequest = undefined;
    });

    const data = await pendingRequest;
    sessionStorage.setItem(cacheKey, JSON.stringify(data.orgs || []));
    data.orgs?.forEach((org) => {
      sessionStorage.setItem(`os-${org.owner.toLowerCase()}`, JSON.stringify(org));
    });

    return data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { orgs: [] };
  }
}
