/**
 * GitHub API utilities - uses server-side API route
 */

/**
 * Fetch all org data with PRs
 * @param {Array<string>} repos - Array of "owner/repo" strings
 * @param {string} author - GitHub username
 * @returns {Promise<Object>} Orgs with their data
 */
export async function fetchGitHubData(repos, author) {
  try {
    const params = new URLSearchParams({
      repos: repos.join(','),
      author: author,
    });
    
    const response = await fetch(`/api/github?${params}`);
    
    if (!response.ok) {
      console.error('API error:', response.status);
      return { orgs: [] };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { orgs: [] };
  }
}

/**
 * Format a PR for display (passthrough)
 */
export function formatPR(pr) {
  return pr;
}
