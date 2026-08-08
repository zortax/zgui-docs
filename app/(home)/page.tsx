import Link from 'next/link';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';

const SNIPPET = `use zgui::prelude::*;

#[component]
fn Counter() -> impl IntoView {
    let count = RwSignal::new(0);

    view! {
        column(class = "counter") {
            text(class = "value") {{move || count.get().to_string()}}
            control(on:click = move |_| count.update(|n| *n += 1)) {
                "Increment"
            }
        }
    }
}`;

const POINTS: { title: string; body: string }[] = [
  {
    title: 'Components run once',
    body: 'A component function builds its part of the document a single time. After that, only the closures that read a changed signal run again. There is no virtual tree and no diff.',
  },
  {
    title: 'Appearance is CSS',
    body: 'Selectors, the cascade, inheritance, flexbox, grid, gradients, shadows, filters and transforms — checked at compile time, over a rendering pipeline of the framework’s own.',
  },
  {
    title: 'Nothing is a browser',
    body: 'No webview, no HTML, no JavaScript. A real window, a real GPU surface, and a document the framework owns from the first node to the last pixel.',
  },
  {
    title: 'Cost follows change',
    body: 'The document, the computed styles, the box tree, the shaped text, the display list and the pixels all survive between frames. A frame redraws the damage and nothing else.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 md:py-28">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border px-3 py-1 text-xs text-fd-muted-foreground">
            Under active development · the API is not yet stable
          </span>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Native user interfaces, written in Rust.
          </h1>
          <p className="max-w-2xl text-lg text-fd-muted-foreground">
            zgui is a retained user interface framework for desktop applications. Components and
            fine-grained signals describe what the interface is; CSS decides how it looks; a
            pipeline the framework owns end to end turns that into pixels.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-lg bg-fd-primary px-4 py-2 font-medium text-fd-primary-foreground"
            >
              Read the guide
            </Link>
            <Link
              href="/docs/getting-started/your-first-application"
              className="rounded-lg border px-4 py-2 font-medium"
            >
              Build the first application
            </Link>
          </div>
        </div>

        <ServerCodeBlock code={SNIPPET} lang="rust" />

        <div className="grid gap-4 md:grid-cols-2">
          {POINTS.map((point) => (
            <div key={point.title} className="rounded-xl border p-5">
              <h2 className="mb-2 font-semibold">{point.title}</h2>
              <p className="text-sm text-fd-muted-foreground">{point.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-fd-muted-foreground">
          New to user interface programming? The guide assumes you know Rust well and assumes
          nothing else. It starts at{' '}
          <Link href="/docs/getting-started/what-zgui-is" className="underline">
            what a user interface framework has to do
          </Link>{' '}
          and builds up from there.
        </p>
      </section>
    </main>
  );
}
