export const appName = 'zgui';
export const appDescription =
  'A retained user interface framework for native Rust applications: components, signals, CSS and a real window.';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// The zgui repository has no public remote yet. Fill this in and the nav-bar link plus the
// per-page "open on GitHub" link start working; leave it `null` and both are simply absent.
export const gitConfig: {
  user: string;
  repo: string;
  branch: string;
} | null = {
    user: "zortax",
    repo: "zgui",
  };

export function githubUrl(): string | undefined {
  if (!gitConfig) return undefined;
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
}

export function githubFileUrl(path: string): string | undefined {
  if (!gitConfig) return undefined;
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`;
}
