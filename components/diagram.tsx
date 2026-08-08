import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type DiagramFrameProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

function DiagramFrame({ label, children, className }: DiagramFrameProps) {
  return (
    <figure
      aria-label={label}
      className={cn(
        'not-prose my-6 overflow-hidden rounded-xl border bg-fd-card/45 p-4 shadow-sm sm:p-5',
        className,
      )}
    >
      {children}
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

export type FlowItem = {
  title: string;
  description?: string;
  code?: string;
  details?: string[];
  next?: string;
};

type FlowDiagramProps = {
  label: string;
  items: FlowItem[];
  direction?: 'vertical' | 'horizontal';
};

export function FlowDiagram({ label, items, direction = 'vertical' }: FlowDiagramProps) {
  const horizontal = direction === 'horizontal';

  return (
    <DiagramFrame label={label}>
      <div className={cn('flex', horizontal ? 'flex-col md:flex-row md:items-stretch' : 'flex-col')}>
        {items.map((item, index) => (
          <div
            className={cn(horizontal && 'contents md:flex md:min-w-0 md:flex-1 md:items-center')}
            key={`${item.title}-${index}`}
          >
            <div
              className={cn(
                'min-w-0 rounded-lg border bg-fd-background px-4 py-3',
                horizontal && 'md:flex-1 md:self-stretch',
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="font-medium text-fd-foreground">{item.title}</span>
                {item.code ? (
                  <code className="break-all text-xs text-fd-muted-foreground">{item.code}</code>
                ) : null}
              </div>
              {item.description ? (
                <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
                  {item.description}
                </p>
              ) : null}
              {item.details?.length ? (
                <ul className="mt-2 grid gap-1 text-xs text-fd-muted-foreground">
                  {item.details.map((detail) => (
                    <li className="rounded-md bg-fd-muted/50 px-2 py-1" key={detail}>
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {index < items.length - 1 ? (
              <div
                aria-hidden="true"
                className={cn(
                  'flex shrink-0 items-center justify-center text-fd-muted-foreground',
                  horizontal ? 'h-12 md:h-auto md:w-14 md:flex-col' : 'min-h-14 flex-col',
                )}
              >
                {item.next ? (
                  <span className="max-w-72 px-2 text-center text-xs leading-snug">{item.next}</span>
                ) : null}
                <ArrowDown className={cn('size-4', horizontal && 'md:hidden')} />
                {horizontal ? <ArrowRight className="hidden size-4 md:block" /> : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export type TreeItem = {
  title: string;
  description?: string;
  code?: string;
  children?: TreeItem[];
};

type TreeDiagramProps = {
  label: string;
  items: TreeItem[];
};

function TreeBranch({ items, depth = 0 }: { items: TreeItem[]; depth?: number }) {
  return (
    <ul className={cn('grid gap-2', depth > 0 && 'ml-4 border-l pl-4 sm:ml-6 sm:pl-6')}>
      {items.map((item, index) => (
        <li className="relative" key={`${item.title}-${index}`}>
          {depth > 0 ? (
            <span
              aria-hidden="true"
              className="absolute -left-4 top-5 w-4 border-t sm:-left-6 sm:w-6"
            />
          ) : null}
          <div className="rounded-lg border bg-fd-background px-3 py-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="font-medium text-fd-foreground">{item.title}</span>
              {item.code ? (
                <code className="break-all text-xs text-fd-muted-foreground">{item.code}</code>
              ) : null}
            </div>
            {item.description ? (
              <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
                {item.description}
              </p>
            ) : null}
          </div>
          {item.children?.length ? (
            <div className="pt-2">
              <TreeBranch depth={depth + 1} items={item.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function TreeDiagram({ label, items }: TreeDiagramProps) {
  return (
    <DiagramFrame label={label}>
      <TreeBranch items={items} />
    </DiagramFrame>
  );
}

export type BitField = {
  label: string;
  range: string;
  description?: string;
  weight?: number;
};

type BitFieldDiagramProps = {
  label: string;
  fields: BitField[];
  footer?: string;
};

export function BitFieldDiagram({ label, fields, footer }: BitFieldDiagramProps) {
  return (
    <DiagramFrame label={label}>
      <div
        className="grid overflow-hidden rounded-lg border bg-fd-background"
        style={{ gridTemplateColumns: fields.map((field) => `${field.weight ?? 1}fr`).join(' ') }}
      >
        {fields.map((field, index) => (
          <div
            className={cn('min-w-0 p-3 text-center', index > 0 && 'border-l')}
            key={`${field.label}-${field.range}`}
          >
            <div className="text-[0.65rem] font-medium uppercase tracking-wider text-fd-muted-foreground">
              bits {field.range}
            </div>
            <div className="mt-1 font-medium text-fd-foreground">{field.label}</div>
            {field.description ? (
              <div className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                {field.description}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {footer ? (
        <div className="mx-auto w-fit rounded-b-lg border-x border-b bg-fd-muted/50 px-4 py-1.5 text-xs font-medium text-fd-muted-foreground">
          {footer}
        </div>
      ) : null}
    </DiagramFrame>
  );
}

export type DecisionCheck = {
  question: string;
  no: string;
};

type DecisionDiagramProps = {
  label: string;
  checks: DecisionCheck[];
  fallback: string;
  fallbackDescription?: string;
};

export function DecisionDiagram({
  label,
  checks,
  fallback,
  fallbackDescription,
}: DecisionDiagramProps) {
  return (
    <DiagramFrame label={label}>
      <div className="mx-auto max-w-2xl">
        {checks.map((check, index) => (
          <div key={check.question}>
            <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(8rem,0.45fr)]">
              <div className="rounded-lg border bg-fd-background px-4 py-3 font-medium">
                {check.question}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-fd-muted-foreground">
                <span>No</span>
                <ArrowRight className="size-4" />
              </div>
              <div className="rounded-lg border bg-fd-muted/55 px-3 py-2 text-center font-medium">
                {check.no}
              </div>
            </div>
            {index < checks.length - 1 ? (
              <div className="flex h-14 w-full max-w-[calc(100%-10rem)] flex-col items-center justify-center text-xs text-fd-muted-foreground md:max-w-[calc(55%-1rem)]">
                <span>Yes</span>
                <ArrowDown className="size-4" />
              </div>
            ) : null}
          </div>
        ))}
        <div className="mt-3 max-w-md rounded-lg border bg-fd-background px-4 py-3 text-center md:mt-4">
          <div className="font-medium">{fallback}</div>
          {fallbackDescription ? (
            <div className="mt-1 text-xs text-fd-muted-foreground">{fallbackDescription}</div>
          ) : null}
        </div>
      </div>
    </DiagramFrame>
  );
}

export type ExchangeMessage = {
  direction: 'left' | 'right';
  label: string;
};

type ExchangeDiagramProps = {
  label: string;
  left: { title: string; description?: string };
  right: { title: string; description?: string };
  messages: ExchangeMessage[];
  foundation?: string;
};

export function ExchangeDiagram({
  label,
  left,
  right,
  messages,
  foundation,
}: ExchangeDiagramProps) {
  return (
    <DiagramFrame label={label}>
      <div className="grid items-start gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(12rem,1.2fr)_minmax(0,0.8fr)]">
        {[left, right].map((side, index) => (
          <div
            className={cn(
              'rounded-lg border bg-fd-background px-4 py-3 text-center',
              index === 0 ? 'order-1' : 'order-3 md:col-start-3',
            )}
            key={side.title}
          >
            <div className="font-medium">{side.title}</div>
            {side.description ? (
              <div className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
                {side.description}
              </div>
            ) : null}
          </div>
        ))}
        <div className="order-2 grid gap-2 md:col-start-2 md:row-start-1">
          {messages.map((message) => (
            <div
              className="flex items-center justify-center gap-2 rounded-md bg-fd-muted/45 px-3 py-2 text-center text-xs text-fd-muted-foreground"
              key={`${message.direction}-${message.label}`}
            >
              {message.direction === 'left' ? <ArrowLeft className="size-4 shrink-0" /> : null}
              <span>{message.label}</span>
              {message.direction === 'right' ? <ArrowRight className="size-4 shrink-0" /> : null}
            </div>
          ))}
        </div>
      </div>
      {foundation ? (
        <div className="mx-auto mt-4 max-w-md rounded-lg border bg-fd-muted/55 px-4 py-2 text-center text-sm font-medium">
          {foundation}
        </div>
      ) : null}
    </DiagramFrame>
  );
}

type BoxModelDiagramProps = {
  margin?: string;
  border?: string;
  padding?: string;
  content?: string;
};

export function BoxModelDiagram({
  margin = 'Margin',
  border = 'Border',
  padding = 'Padding',
  content = 'Content',
}: BoxModelDiagramProps) {
  const layers = [
    { label: margin, className: 'border-dashed bg-fd-muted/30' },
    { label: border, className: 'border-fd-primary/50 bg-fd-primary/5' },
    { label: padding, className: 'border-dashed bg-fd-muted/55' },
  ];

  let box: ReactNode = (
    <div className="flex min-h-24 items-center justify-center rounded-md border bg-fd-background px-4 py-6 text-sm font-semibold shadow-sm">
      {content}
    </div>
  );

  for (const layer of layers.toReversed()) {
    box = (
      <div className={cn('rounded-lg border p-3 sm:p-4', layer.className)}>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-fd-muted-foreground">
          {layer.label}
        </div>
        {box}
      </div>
    );
  }

  return <DiagramFrame label="The CSS box model">{box}</DiagramFrame>;
}

type LineMetricsDiagramProps = {
  sample?: string;
};

export function LineMetricsDiagram({ sample = 'Hello, typography' }: LineMetricsDiagramProps) {
  return (
    <DiagramFrame label="How a line box is divided around its baseline">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-lg border bg-fd-background text-sm">
        <div className="flex min-h-12 items-center justify-center bg-fd-muted/35 text-fd-muted-foreground">
          Half the leading
        </div>
        <div className="flex items-center border-l px-3 text-xs text-fd-muted-foreground">
          Line box top
        </div>
        <div className="flex min-h-16 items-end justify-center border-t border-dashed px-4 pb-1 text-2xl font-medium">
          {sample}
        </div>
        <div className="flex items-start border-l border-t border-dashed px-3 pt-2 text-xs text-fd-muted-foreground">
          Face ascent
        </div>
        <div className="min-h-8 border-t-2 border-fd-primary/70 bg-fd-primary/5" />
        <div className="flex items-start border-l border-t-2 border-fd-primary/70 px-3 pt-1 text-xs font-medium text-fd-primary">
          Baseline
        </div>
        <div className="flex min-h-10 items-center justify-center text-fd-muted-foreground">
          Face descent
        </div>
        <div className="border-l px-3" />
        <div className="flex min-h-12 items-center justify-center border-t border-dashed bg-fd-muted/35 text-fd-muted-foreground">
          Half the leading
        </div>
        <div className="flex items-center border-l border-t border-dashed px-3 text-xs text-fd-muted-foreground">
          Line box bottom
        </div>
      </div>
    </DiagramFrame>
  );
}

export type AnatomyPart = {
  value: string;
  label: string;
};

type AnatomyDiagramProps = {
  label: string;
  parts: AnatomyPart[];
};

export function AnatomyDiagram({ label, parts }: AnatomyDiagramProps) {
  return (
    <DiagramFrame label={label}>
      <div className="flex flex-wrap overflow-hidden rounded-lg border bg-fd-background font-mono text-sm">
        {parts.map((part, index) => (
          <span
            className={cn(
              'max-w-full break-all border-r px-2.5 py-3 font-medium last:border-r-0',
              index % 2 === 0 ? 'bg-fd-primary/8 text-fd-primary' : 'bg-fd-muted/50',
            )}
            key={`${part.value}-${part.label}`}
          >
            {part.value}
          </span>
        ))}
      </div>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {parts.map((part) => (
          <div className="rounded-lg bg-fd-muted/45 px-3 py-2" key={`${part.label}-${part.value}`}>
            <dt className="font-mono text-xs font-medium text-fd-foreground">{part.value}</dt>
            <dd className="mt-0.5 text-xs leading-relaxed text-fd-muted-foreground">{part.label}</dd>
          </div>
        ))}
      </dl>
    </DiagramFrame>
  );
}

type PhaseDiagramProps = {
  label: string;
  phases: string[];
};

export function PhaseDiagram({ label, phases }: PhaseDiagramProps) {
  return (
    <DiagramFrame label={label}>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <li className="flex items-center gap-3 rounded-lg border bg-fd-background px-3 py-2" key={phase}>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-fd-primary/10 text-xs font-semibold text-fd-primary">
              {index + 1}
            </span>
            <code className="text-xs font-medium">{phase}</code>
          </li>
        ))}
      </ol>
    </DiagramFrame>
  );
}
