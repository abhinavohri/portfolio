import { NextResponse } from 'next/server';

/**
 * Server-side API route for GitHub data
 * Fetches PRs and repo metadata (name, description, languages, avatar)
 * Cached for 1 hour to avoid rate limits and improve performance
 */

// Cache this route for 1 hour (3600 seconds)
export const revalidate = 3600;

const GITHUB_API = 'https://api.github.com';

let cache = {
  data: null,
  key: null,
  timestamp: 0,
};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

function getHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const repos = searchParams.get('repos')?.split(',') || [];
  const author = searchParams.get('author');

  if (!repos.length || !author) {
    return NextResponse.json({ error: 'Missing repos or author' }, { status: 400 });
  }

  // Check cache first
  const cacheKey = `${author}:${repos.sort().join(',')}`;
  const now = Date.now();
  
  if (cache.key === cacheKey && cache.data && (now - cache.timestamp) < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const headers = getHeaders();

  try {
    // Extract unique orgs from repos
    const orgs = [...new Set(repos.map(r => r.split('/')[0]))];
    
    // Build a single query for all orgs: author:username type:pr org:org1 org:org2 ...
    const orgQuery = orgs.map(org => `org:${org}`).join(' ');
    const query = `author:${author} type:pr ${orgQuery}`;
    const searchUrl = `${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&per_page=100`;

    // Fetch all PRs in one request
    const searchResponse = await fetch(searchUrl, { headers });
    if (!searchResponse.ok) {
      console.error('Search API error:', searchResponse.status);
      return NextResponse.json({ orgs: [] });
    }
    
    const searchData = await searchResponse.json();
    const allPRs = searchData.items || [];

    // Group PRs by org
    const prsByOrg = {};
    for (const pr of allPRs) {
      // Extract org from the repo URL: https://github.com/org/repo/...
      const urlParts = pr.html_url.split('/');
      const org = urlParts[3];
      const repo = urlParts[4];
      
      if (!prsByOrg[org]) {
        prsByOrg[org] = [];
      }
      
      prsByOrg[org].push({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        url: pr.html_url,
        state: pr.state,
        merged: pr.pull_request?.merged_at ? true : false,
        repo: `${org}/${repo}`,
        created_at: pr.created_at,
      });
    }

    // Build results for each org
    const results = [];
    
    for (const org of orgs) {
      const orgPRs = prsByOrg[org] || [];
      if (orgPRs.length === 0) continue;

      // Get org repos from the config
      const orgRepos = repos.filter(r => r.startsWith(`${org}/`));
      
      // Fetch org/repo info for avatar and description
      let repoInfo = null;
      let languages = [];
      
      // Use first repo to get org info
      const firstRepo = orgRepos[0];
      try {
        const repoResponse = await fetch(`${GITHUB_API}/repos/${firstRepo}`, { headers });
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          repoInfo = {
            name: repoData.owner.login,
            fullName: repoData.full_name,
            description: repoData.description,
            avatar: repoData.owner.avatar_url,
            url: `https://github.com/${org}`,
          };
        }
      } catch (e) {
        console.error('Error fetching repo info:', e);
      }

      // Fetch languages from first repo
      try {
        const langResponse = await fetch(`${GITHUB_API}/repos/${firstRepo}/languages`, { headers });
        if (langResponse.ok) {
          const langData = await langResponse.json();
          languages = Object.keys(langData).slice(0, 4);
        }
      } catch (e) {
        console.error('Error fetching languages:', e);
      }

      results.push({
        owner: org,
        repos: orgRepos,
        info: repoInfo || { name: org, description: '', avatar: '' },
        languages,
        stats: {
          total: orgPRs.length,
          merged: orgPRs.filter(pr => pr.merged).length,
          open: orgPRs.filter(pr => pr.state === 'open').length,
          closed: orgPRs.filter(pr => pr.state === 'closed' && !pr.merged).length,
        },
        prs: orgPRs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
      });
    }

    // Cache the result
    const responseData = { orgs: results };
    cache = {
      data: responseData,
      key: cacheKey,
      timestamp: Date.now(),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
