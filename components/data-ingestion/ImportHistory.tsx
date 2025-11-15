"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImportLog {
  _id: string;
  filename: string;
  source: string;
  status: "pending" | "processing" | "completed" | "failed";
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  uploadedBy: string;
  createdAt: string;
}

export function ImportHistory() {
  const [imports, setImports] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImports();
  }, []);

  const fetchImports = async () => {
    try {
      const response = await fetch("/api/data-ingestion/imports?limit=20");
      const data = await response.json();
      if (data.success) {
        setImports(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch imports", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "processing":
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-900/20 border-green-500";
      case "failed":
        return "bg-red-900/20 border-red-500";
      case "processing":
        return "bg-blue-900/20 border-blue-500";
      default:
        return "bg-yellow-900/20 border-yellow-500";
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-4">Import History</h2>

      {imports.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No imports yet</p>
      ) : (
        <div className="space-y-3">
          {imports.map((importLog) => (
            <div
              key={importLog._id}
              className={`p-4 rounded-lg border ${getStatusColor(importLog.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(importLog.status)}
                    <h3 className="font-semibold text-slate-100">{importLog.filename}</h3>
                    <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">
                      {importLog.source}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-slate-400">Total: </span>
                      <span className="text-slate-100 font-medium">{importLog.totalRecords}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Processed: </span>
                      <span className="text-green-400 font-medium">
                        {importLog.processedRecords}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Failed: </span>
                      <span className="text-red-400 font-medium">{importLog.failedRecords}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">By: </span>
                      <span className="text-slate-100 font-medium">{importLog.uploadedBy}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(importLog.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-gold"
                  onClick={() => {
                    // TODO: Open import details modal
                    console.log("View details", importLog._id);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

