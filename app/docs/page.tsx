import Link from "next/link";

const instructions = [
  {
    title: "1. Configure Environment Variables",
    details: [
      "`MONGODB_URI` - MongoDB connection string",
      "`JWT_SECRET` - 32+ character secret for auth cookies",
      "`APP_URL` - Base URL for the Next.js app",
      "`ANALYTICS_SERVICE_URL` - (Optional) URL of Python analytics service"
    ]
  },
  {
    title: "2. Install Dependencies",
    details: ["`npm install`", "`pip install -r analytics-service/requirements.txt` (optional)"]
  },
  {
    title: "3. Seed Database",
    details: ["`npm run seed` to create a SuperAdmin and default KPI weights"]
  },
  {
    title: "4. Run Services",
    details: ["`npm run dev` to start Next.js", "`python analytics-service/app.py` to run analytics"]
  }
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-100">Implementation Guide</h1>
        <p className="text-sm text-slate-400">
          Follow these steps to run the Smart Police Analytics dashboard locally or in production.
        </p>
      </div>
      <div className="space-y-6">
        {instructions.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-slate-800 bg-[#111b33] p-6 shadow-lg shadow-black/10"
          >
            <h2 className="text-lg font-semibold text-gold">{section.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {section.details.map((detail) => (
                <li key={detail} className="leading-relaxed">
                  {detail}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-800 bg-[#111b33] p-6 text-sm text-slate-300">
        Need more context? Read the project <Link href="https://github.com" className="text-gold hover:underline">README</Link> or reach out to Team Innosphere.
      </div>
    </main>
  );
}


