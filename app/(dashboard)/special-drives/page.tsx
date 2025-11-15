"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NBWDriveTable } from "@/components/special-drives/NBWDriveTable";
import { FirearmsDriveTable } from "@/components/special-drives/FirearmsDriveTable";
import { NarcoticsDriveTable } from "@/components/special-drives/NarcoticsDriveTable";
import { MissingPersonsTable } from "@/components/special-drives/MissingPersonsTable";
import { CasePendencyTable } from "@/components/special-drives/CasePendencyTable";
import { DataEntryForm } from "@/components/special-drives/DataEntryForm";
import {
  FileText,
  Shield,
  Target,
  AlertCircle,
  Users,
  TrendingDown,
  MapPin,
  Scale,
  Pill,
  Plus
} from "lucide-react";

type DriveType =
  | "nbw"
  | "firearms"
  | "sand-mining"
  | "missing-persons"
  | "case-pendency"
  | "preventive-measures"
  | "excise"
  | "opg"
  | "narcotics";

const driveTypes: { type: DriveType; label: string; icon: any }[] = [
  { type: "nbw", label: "Pending NBWs", icon: FileText },
  { type: "firearms", label: "Illegal Firearms", icon: Shield },
  { type: "sand-mining", label: "Sand Mining", icon: Target },
  { type: "missing-persons", label: "Missing Persons", icon: Users },
  { type: "case-pendency", label: "Case Pendency", icon: TrendingDown },
  { type: "preventive-measures", label: "Preventive Measures", icon: AlertCircle },
  { type: "excise", label: "Excise Act", icon: Scale },
  { type: "opg", label: "OPG Act", icon: MapPin },
  { type: "narcotics", label: "Narcotics Enforcement", icon: Pill }
];

export default function SpecialDrivesPage() {
  const [selectedType, setSelectedType] = useState<DriveType>("nbw");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/special-drives/${selectedType}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    switch (selectedType) {
      case "nbw":
        return <NBWDriveTable data={data} />;
      case "firearms":
        return <FirearmsDriveTable data={data} />;
      case "narcotics":
        return <NarcoticsDriveTable data={data} />;
      case "missing-persons":
        return <MissingPersonsTable data={data} />;
      case "case-pendency":
        return <CasePendencyTable data={data} />;
      default:
        return (
          <Card className="p-6 bg-slate-800">
            <div className="text-center py-12 text-slate-400">
              Table visualization for {selectedType} coming soon. Use Excel export for now.
            </div>
          </Card>
        );
    }
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Special Drives Reports</h1>
          <p className="text-sm text-slate-400 mt-1">
            View and export structured reports for all special drives with clean, well-formatted
            tables.
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gold hover:bg-gold/90 text-slate-900 font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "Hide Form" : "Add Entry"}
        </Button>
      </div>

      {/* Data Entry Form */}
      {showForm && (
        <DataEntryForm
          type={selectedType}
          onSuccess={() => {
            fetchData();
            setShowForm(false);
          }}
        />
      )}

      {/* Drive Type Selector */}
      <Card className="p-4 bg-slate-800">
        <div className="flex flex-wrap gap-2">
          {driveTypes.map((drive) => {
            const Icon = drive.icon;
            const isActive = selectedType === drive.type;
            return (
              <Button
                key={drive.type}
                onClick={() => setSelectedType(drive.type)}
                variant={isActive ? "default" : "outline"}
                className={
                  isActive
                    ? "bg-gold text-slate-900 hover:bg-gold/90"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {drive.label}
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Table Display */}
      {loading ? (
        <Card className="p-6 bg-slate-800">
          <div className="text-center py-12 text-slate-400">Loading data...</div>
        </Card>
      ) : (
        renderTable()
      )}
    </div>
  );
}

