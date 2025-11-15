import { DistrictMap } from "@/components/gis/DistrictMap";
import { getDistrictPerformance } from "@/lib/services/districtAnalytics";
import { Card } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";

export default async function MapPage() {
  const districts = await getDistrictPerformance();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Geographic Performance Map</h1>
        <p className="text-sm text-slate-400 mt-1">
          Interactive map showing district-wise performance metrics with location-based insights.
        </p>
      </div>

      <DistrictMap districts={districts} />

      <Card className="p-6 bg-slate-800">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <strong className="text-slate-100">Map Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Click on markers to view detailed district performance</li>
              <li>Color-coded markers indicate performance levels (Green: High, Yellow: Medium, Red: Low)</li>
              <li>Performance metrics include cases closed, convictions, and average scores</li>
              <li>Zoom and pan to explore different regions</li>
            </ul>
            <p className="mt-3 text-xs text-slate-400">
              Note: District coordinates are approximate. For production use, integrate with official
              GIS data sources.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

