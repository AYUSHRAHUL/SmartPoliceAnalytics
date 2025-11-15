"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Plus, X } from "lucide-react";

type CCTNSModule = "SpecialDrives" | "Convictions" | "Detections";

interface FormData {
  module: CCTNSModule;
  officerBadgeId: string;
  officerName: string;
  department: string;
  district: string;
  // Special Drives
  driveName?: string;
  driveDate?: string;
  casesHandled?: number;
  // Convictions
  caseNumber?: string;
  convictionDate?: string;
  crimeType?: string;
  courtName?: string;
  // Detections
  detectionDate?: string;
  crimeCategory?: string;
  valueRecovered?: number;
}

export function ManualEntryForm() {
  const [module, setModule] = useState<CCTNSModule>("SpecialDrives");
  const [formData, setFormData] = useState<FormData>({
    module: "SpecialDrives",
    officerBadgeId: "",
    officerName: "",
    department: "",
    district: "",
    driveName: "",
    driveDate: "",
    casesHandled: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleModuleChange = (newModule: CCTNSModule) => {
    setModule(newModule);
    setFormData({
      ...formData,
      module: newModule
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      // Create a CSV-like structure and convert to buffer
      const headers: string[] = [];
      const values: string[] = [];

      // Common fields
      headers.push("badgeId", "officerName", "department", "district");
      values.push(
        formData.officerBadgeId,
        formData.officerName,
        formData.department,
        formData.district
      );

      // Module-specific fields
      if (module === "SpecialDrives") {
        headers.push("driveName", "driveDate", "casesHandled");
        values.push(
          formData.driveName || "",
          formData.driveDate || "",
          String(formData.casesHandled || 0)
        );
      } else if (module === "Convictions") {
        headers.push("caseNumber", "convictionDate", "crimeType", "courtName");
        values.push(
          formData.caseNumber || "",
          formData.convictionDate || "",
          formData.crimeType || "",
          formData.courtName || ""
        );
      } else if (module === "Detections") {
        headers.push("detectionDate", "crimeCategory", "valueRecovered");
        values.push(
          formData.detectionDate || "",
          formData.crimeCategory || "",
          String(formData.valueRecovered || 0)
        );
      }

      // Create CSV content
      const csvContent = headers.join(",") + "\n" + values.join(",");

      // Use the same ingestion API
      const formDataToSend = new FormData();
      const blob = new Blob([csvContent], { type: "text/csv" });
      const file = new File([blob], `manual-entry-${Date.now()}.csv`, { type: "text/csv" });
      formDataToSend.append("file", file);
      formDataToSend.append("source", "Manual");
      formDataToSend.append("module", module);

      const response = await fetch("/api/data-ingestion/upload", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        module,
        officerBadgeId: "",
        officerName: "",
        department: "",
        district: "",
        driveName: "",
        driveDate: "",
        casesHandled: 0
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-4">Manual Entry</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Module Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Module Type</label>
          <select
            value={module}
            onChange={(e) => handleModuleChange(e.target.value as CCTNSModule)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-gold"
            disabled={submitting}
          >
            <option value="SpecialDrives">Special Drives</option>
            <option value="Convictions">Convictions</option>
            <option value="Detections">Detections</option>
          </select>
        </div>

        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Badge ID <span className="text-red-400">*</span>
            </label>
            <Input
              value={formData.officerBadgeId}
              onChange={(e) => setFormData({ ...formData, officerBadgeId: e.target.value })}
              required
              disabled={submitting}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Officer Name</label>
            <Input
              value={formData.officerName}
              onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
              disabled={submitting}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
            <Input
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              disabled={submitting}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">District</label>
            <Input
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              disabled={submitting}
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
        </div>

        {/* Module-Specific Fields */}
        {module === "SpecialDrives" && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Drive Name</label>
              <Input
                value={formData.driveName}
                onChange={(e) => setFormData({ ...formData, driveName: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Drive Date</label>
              <Input
                type="date"
                value={formData.driveDate}
                onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cases Handled
              </label>
              <Input
                type="number"
                value={formData.casesHandled}
                onChange={(e) =>
                  setFormData({ ...formData, casesHandled: parseInt(e.target.value) || 0 })
                }
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
          </div>
        )}

        {module === "Convictions" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Case Number</label>
              <Input
                value={formData.caseNumber}
                onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Conviction Date
              </label>
              <Input
                type="date"
                value={formData.convictionDate}
                onChange={(e) => setFormData({ ...formData, convictionDate: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Crime Type</label>
              <Input
                value={formData.crimeType}
                onChange={(e) => setFormData({ ...formData, crimeType: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Court Name</label>
              <Input
                value={formData.courtName}
                onChange={(e) => setFormData({ ...formData, courtName: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
          </div>
        )}

        {module === "Detections" && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Detection Date
              </label>
              <Input
                type="date"
                value={formData.detectionDate}
                onChange={(e) => setFormData({ ...formData, detectionDate: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Crime Category
              </label>
              <Input
                value={formData.crimeCategory}
                onChange={(e) => setFormData({ ...formData, crimeCategory: e.target.value })}
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Value Recovered
              </label>
              <Input
                type="number"
                value={formData.valueRecovered}
                onChange={(e) =>
                  setFormData({ ...formData, valueRecovered: parseFloat(e.target.value) || 0 })
                }
                disabled={submitting}
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={submitting || !formData.officerBadgeId}
            className="flex-1 bg-gold hover:bg-gold/90 text-slate-900 font-semibold"
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Submit Entry
              </>
            )}
          </Button>
        </div>

        {success && (
          <div className="p-3 bg-green-900/20 border border-green-500 rounded-lg text-green-400">
            Entry submitted successfully!
          </div>
        )}
      </form>
    </Card>
  );
}

