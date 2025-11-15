"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, TrendingUp, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false
});

interface DistrictData {
  district: string;
  totalCasesClosed: number;
  totalConvictions: number;
  averageScore: number;
  latitude?: number;
  longitude?: number;
}

// Odisha State District Coordinates
const DISTRICT_COORDINATES: Record<string, [number, number]> = {
  // Odisha Districts
  "Angul": [20.8311, 85.1014],
  "Balangir": [20.7074, 83.4903],
  "Balasore": [21.4944, 86.9336],
  "Bargarh": [21.3333, 83.6167],
  "Bhadrak": [21.0544, 86.5006],
  "Boudh": [20.8333, 84.3333],
  "Cuttack": [20.4625, 85.8820],
  "Deogarh": [21.5333, 84.7333],
  "Dhenkanal": [20.6667, 85.6000],
  "Gajapati": [18.9167, 84.1667],
  "Ganjam": [19.3144, 84.7941],
  "Jagatsinghpur": [20.2667, 86.1667],
  "Jajpur": [20.8500, 86.3333],
  "Jharsuguda": [21.8500, 84.0333],
  "Kalahandi": [19.9000, 83.1667],
  "Kandhamal": [20.4667, 84.2333],
  "Kendrapara": [20.5000, 86.4167],
  "Kendujhar": [21.6333, 85.6000],
  "Khordha": [20.1833, 85.6167],
  "Koraput": [18.8167, 82.7167],
  "Malkangiri": [18.3500, 81.9000],
  "Mayurbhanj": [22.2667, 86.6167],
  "Nabarangpur": [19.2333, 82.5500],
  "Nayagarh": [20.1333, 85.1000],
  "Nuapada": [20.6167, 82.8000],
  "Puri": [19.8006, 85.8250],
  "Rayagada": [19.1667, 83.4167],
  "Sambalpur": [21.4667, 83.9667],
  "Subarnapur": [20.9333, 83.7167],
  "Sundargarh": [22.1167, 84.0333],
  // Other major cities (for backward compatibility)
  "Bhubaneswar": [20.2961, 85.8245],
  "Pune": [18.5204, 73.8567],
  "Mumbai": [19.0760, 72.8777],
  "Delhi": [28.6139, 77.2090]
};

// Default center (Odisha State)
const DEFAULT_CENTER: [number, number] = [20.2961, 85.8245]; // Bhubaneswar
const DEFAULT_ZOOM = 7;

export function DistrictMap({ districts }: { districts: DistrictData[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Import Leaflet CSS
    import("leaflet/dist/leaflet.css");
  }, []);

  const getDistrictCoordinates = (district: string): [number, number] | null => {
    // Try exact match first
    if (DISTRICT_COORDINATES[district]) {
      return DISTRICT_COORDINATES[district];
    }

    // Try case-insensitive match
    const key = Object.keys(DISTRICT_COORDINATES).find(
      (k) => k.toLowerCase() === district.toLowerCase()
    );
    if (key) {
      return DISTRICT_COORDINATES[key];
    }

    return null;
  };

  const getMarkerColor = (score: number) => {
    if (score >= 70) return "green";
    if (score >= 50) return "yellow";
    return "red";
  };

  if (!mounted) {
    return (
      <Card className="p-6 bg-slate-800">
        <div className="flex items-center justify-center h-96">
          <div className="text-slate-400">Loading map...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-800">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-bold text-slate-100">District Performance Map</h3>
      </div>
      <div className="h-96 w-full rounded-lg overflow-hidden border border-slate-700">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {districts.map((district, idx) => {
            const coords = getDistrictCoordinates(district.district);
            if (!coords) return null;

            return (
              <Marker key={idx} position={coords}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h4 className="font-bold text-slate-900 mb-2">{district.district}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span>Score: {district.averageScore.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-green-500" />
                        <span>Cases: {district.totalCasesClosed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>Convictions: {district.totalConvictions}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>High Performance (70+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Medium Performance (50-70)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Low Performance (&lt;50)</span>
        </div>
      </div>
    </Card>
  );
}

