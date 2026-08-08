import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, githubUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" opacity="0.12" />
            <path
              d="M7.5 8h9l-9 8h9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold">{appName}</span>
        </>
      ),
    },
    githubUrl: githubUrl(),
  };
}
