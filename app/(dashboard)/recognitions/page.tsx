import { getRecognitionFeed } from "@/lib/services/recognitions";
import { RecognitionTimeline } from "@/components/recognitions/RecognitionTimeline";

export default async function RecognitionsPage() {
  const recognitions = await getRecognitionFeed();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Recognition Center</h1>
        <p className="text-sm text-slate-400">
          Celebrate officers earning Gold, Silver, and Bronze badges for outstanding service.
        </p>
      </div>
      <RecognitionTimeline items={recognitions} />
    </div>
  );
}


