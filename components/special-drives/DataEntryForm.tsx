"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";

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

interface DataEntryFormProps {
  type: DriveType;
  onSuccess?: () => void;
}

export function DataEntryForm({ type, onSuccess }: DataEntryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    district: "",
    driveDate: new Date().toISOString().split("T")[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/special-drives/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save data");
      }

      // Reset form
      setFormData({
        district: "",
        driveDate: new Date().toISOString().split("T")[0]
      });

      if (onSuccess) {
        onSuccess();
      }

      alert("Data saved successfully!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save data");
    } finally {
      setSubmitting(false);
    }
  };

  const getFormFields = () => {
    switch (type) {
      case "nbw":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Total NBW Pending Start
                </label>
                <Input
                  type="number"
                  value={formData.totalNBWPendingStart || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, totalNBWPendingStart: parseInt(e.target.value) || 0 })
                  }
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  NBW Received
                </label>
                <Input
                  type="number"
                  value={formData.nbwReceived || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nbwReceived: parseInt(e.target.value) || 0 })
                  }
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  NBW Executed During Drive
                </label>
                <Input
                  type="number"
                  value={formData.nbwExecutedDuringDrive || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nbwExecutedDuringDrive: parseInt(e.target.value) || 0
                    })
                  }
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  NBW Otherwise Disposed
                </label>
                <Input
                  type="number"
                  value={formData.nbwOtherwiseDisposed || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nbwOtherwiseDisposed: parseInt(e.target.value) || 0
                    })
                  }
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  NBW Pending End
                </label>
                <Input
                  type="number"
                  value={formData.nbwPendingEnd || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nbwPendingEnd: parseInt(e.target.value) || 0 })
                  }
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  NBW Executed ST/GR
                </label>
                <Input
                  type="number"
                  value={formData.nbwExecutedSTGR || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nbwExecutedSTGR: parseInt(e.target.value) || 0 })
                  }
                  className="bg-slate-800 border-slate-600 text-slate-100"
                />
              </div>
            </div>
          </>
        );

      case "firearms":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cases Registered
              </label>
              <Input
                type="number"
                value={formData.casesRegistered || ""}
                onChange={(e) =>
                  setFormData({ ...formData, casesRegistered: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Persons Arrested
              </label>
              <Input
                type="number"
                value={formData.personsArrested || ""}
                onChange={(e) =>
                  setFormData({ ...formData, personsArrested: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Guns/Rifles
              </label>
              <Input
                type="number"
                value={formData.gunsRifles || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gunsRifles: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pistols</label>
              <Input
                type="number"
                value={formData.pistols || ""}
                onChange={(e) =>
                  setFormData({ ...formData, pistols: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">AK-47</label>
              <Input
                type="number"
                value={formData.ak47 || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ak47: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ammunition
              </label>
              <Input
                type="number"
                value={formData.ammunition || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ammunition: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
          </div>
        );

      case "narcotics":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cases Registered
              </label>
              <Input
                type="number"
                value={formData.casesRegistered || ""}
                onChange={(e) =>
                  setFormData({ ...formData, casesRegistered: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Persons Arrested
              </label>
              <Input
                type="number"
                value={formData.personsArrested || ""}
                onChange={(e) =>
                  setFormData({ ...formData, personsArrested: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ganja (kg)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.ganja || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ganja: parseFloat(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Brown Sugar (kg)
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.brownSugar || ""}
                onChange={(e) =>
                  setFormData({ ...formData, brownSugar: parseFloat(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Vehicles</label>
              <Input
                type="number"
                value={formData.vehicles || ""}
                onChange={(e) =>
                  setFormData({ ...formData, vehicles: parseInt(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cash Seized (₹)
              </label>
              <Input
                type="number"
                value={formData.cash || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cash: parseFloat(e.target.value) || 0 })
                }
                className="bg-slate-800 border-slate-600 text-slate-100"
              />
            </div>
          </div>
        );

      default:
        return <div className="text-slate-400">Form fields for {type} coming soon</div>;
    }
  };

  return (
    <Card className="p-6 bg-slate-800">
      <h3 className="text-lg font-bold text-slate-100 mb-4">Add New Entry</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              District <span className="text-red-400">*</span>
            </label>
            <Input
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              required
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Drive Date <span className="text-red-400">*</span>
            </label>
            <Input
              type="date"
              value={formData.driveDate}
              onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
              required
              className="bg-slate-800 border-slate-600 text-slate-100"
            />
          </div>
        </div>

        {getFormFields()}

        <Button
          type="submit"
          disabled={submitting || !formData.district}
          className="w-full bg-gold hover:bg-gold/90 text-slate-900 font-semibold"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

