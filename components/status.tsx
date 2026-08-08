import type { ReactNode } from 'react';

type Kind = 'stable' | 'unstable' | 'planned' | 'partial';

const STYLES: Record<Kind, { label: string; className: string }> = {
  stable: {
    label: 'Stable',
    className: 'border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400',
  },
  partial: {
    label: 'Partial',
    className: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  },
  unstable: {
    label: 'Changing',
    className: 'border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-400',
  },
  planned: {
    label: 'Not built yet',
    className: 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400',
  },
};

/**
 * A small inline badge that states how settled a piece of the framework is.
 *
 * `<Status kind="planned">for / if in view!</Status>`
 */
export function Status({ kind, children }: { kind: Kind; children?: ReactNode }) {
  const style = STYLES[kind];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 align-middle text-xs font-medium ${style.className}`}
    >
      {style.label}
      {children ? <span className="opacity-70">· {children}</span> : null}
    </span>
  );
}
