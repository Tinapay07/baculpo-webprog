import Button from "../components/Button";

const metrics = [
  {
    value: "12",
    label: "Student-ready layouts",
    note: "Flexible section systems for school web projects.",
  },
  {
    value: "08",
    label: "Content blocks",
    note: "Reusable patterns for hero, story, gallery, and CTA areas.",
  },
  {
    value: "24",
    label: "Visual studies",
    note: "Thumbnail explorations before the final composition is chosen.",
  },
  {
    value: "04",
    label: "Brand pillars",
    note: "Clarity, rhythm, warmth, and structure across each page.",
  },
];

const services = [
  {
    title: "Story-led homepages",
    description:
      "We use strong hierarchy, bold headlines, and calm supporting copy so the first screen explains the brand before the user scrolls.",
  },
  {
    title: "Profile and about systems",
    description:
      "About pages balance biography, values, proof points, and visual texture so the person behind the work feels memorable and credible.",
  },
  {
    title: "Editorial article layouts",
    description:
      "Card grids, reading notes, and featured story modules help collections of writing feel curated rather than simply listed.",
  },
];

const principles = [
  "Design decisions start with the content we want people to remember.",
  "Simple shapes and clear spacing can still feel premium when the rhythm is intentional.",
  "Reusable patterns make revision faster without making pages look repetitive.",
];

const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[34px] border border-[#181716] bg-[#fffaf2]/90 p-6 shadow-[0_24px_70px_rgba(24,23,22,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#7b745e]">
              Home / Cookie Atelier
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-none tracking-[-0.05em] text-[#4a2f1b] sm:text-5xl lg:text-6xl">
              We bake cozy cookie-inspired layouts with a warm, flavorful tone.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#6b563f] sm:text-lg">
              Cookie Atelier blends s'mores, matcha, biscoff, and classic cookie
              flavor notes into a site design that feels deliciously
              approachable and easy to explore.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button to="/about" variant="primary">
              Meet the Studio
            </Button>
            <Button to="/articles">Browse Articles</Button>
            <Button to="/auth/signup">Sign Up</Button>
          </div>

          <div className="rounded-[28px] border border-[#181716]/15 bg-[#f4efe7] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6d6459]">
              Why this works
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#4d473f]">
              The homepage now introduces a brand, shows a custom image, and
              explains the design direction instead of relying on placeholder
              copy.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/cookie-doughbox.jpg"
            alt="Delicious cookies and bakery setup"
            className="w-full rounded-[30px] border border-[#181716] bg-[#f7f2ea] object-cover"
          />
        </div>
      </section>

      <section className="rounded-[34px] border border-[#181716] bg-[#fffaf2]/80 p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#7b745e]">
              Flavor Metrics
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#4a2f1b]">
              A sweet system that scales across cards and pages
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#4d473f]">
            These cards show how the same visual language handles numbers,
            supporting detail, and consistent spacing without losing
            readability.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[28px] border border-[#181716] bg-white/50 p-5 shadow-[0_12px_30px_rgba(24,23,22,0.04)]"
            >
              <p className="text-3xl font-semibold tracking-[-0.05em] text-[#181716]">
                {metric.value}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[#181716]">
                {metric.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#4d473f]">
                {metric.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[34px] border border-[#181716] bg-[#fffaf2]/80 p-6 lg:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#6d6459]">
            What We Design
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#181716]">
            Three building blocks for stronger student projects
          </h2>

          <div className="mt-6 grid gap-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[28px] border border-[#4a2f1b]/15 bg-[#f7e7d0] p-5"
              >
                <h3 className="text-xl font-semibold text-[#4a2f1b]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6b563f]">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[34px] border border-[#181716] bg-[#181716] p-6 text-[#f4efe7] lg:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#c9beb0]">
            Design Principles
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe7]">
            A homepage should guide, not just decorate.
          </h2>
          <div className="mt-6 space-y-4">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-[24px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm leading-6 text-[#e7ded1]">{principle}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default HomePage;
