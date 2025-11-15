"use client";

import { useState } from "react";
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ImportSource = "CCTNS_SpecialDrives" | "CCTNS_Convictions" | "CCTNS_Detections" | "Manual" | "Excel" | "CSV" | "PDF";
type CCTNSModule = "SpecialDrives" | "Convictions" | "Detections";

interface UploadResult {
  success: boolean;
  importLogId: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  errors: Array<{ row: number; field: string; message: string }>;
}

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<ImportSource>("Excel");
  const [module, setModule] = useState<CCTNSModule>("SpecialDrives");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);

      // Auto-detect source based on file extension
      const ext = selectedFile.name.toLowerCase().split(".").pop();
      if (ext === "xlsx" || ext === "xls") {
        setSource("Excel");
      } else if (ext === "csv") {
        setSource("CSV");
      } else if (ext === "pdf") {
        setSource("PDF");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("source", source);
      formData.append("module", module);

      const response = await fetch("/api/data-ingestion/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-4">Upload Data File</h2>

        {/* File Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select File (Excel, CSV, or PDF)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-gold transition-colors">
                  {file ? (
                    <div className="flex items-center gap-3">
                      <File className="w-8 h-8 text-gold" />
                      <div className="flex-1">
                        <p className="text-slate-100 font-medium">{file.name}</p>
                        <p className="text-sm text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      {!uploading && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFile(null);
                          }}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-300">Click to select file</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports: .xlsx, .xls, .csv, .pdf
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Source Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Data Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as ImportSource)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-gold"
              disabled={uploading}
            >
              <option value="Excel">Excel File</option>
              <option value="CSV">CSV File</option>
              <option value="PDF">PDF File</option>
              <option value="CCTNS_SpecialDrives">CCTNS - Special Drives</option>
              <option value="CCTNS_Convictions">CCTNS - Convictions</option>
              <option value="CCTNS_Detections">CCTNS - Detections</option>
              <option value="Manual">Manual Entry</option>
            </select>
          </div>

          {/* Module Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              CCTNS Module
            </label>
            <select
              value={module}
              onChange={(e) => setModule(e.target.value as CCTNSModule)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-gold"
              disabled={uploading}
            >
              <option value="SpecialDrives">Special Drives</option>
              <option value="Convictions">Convictions</option>
              <option value="Detections">Detections</option>
            </select>
          </div>

          {/* Upload Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="flex-1 bg-gold hover:bg-gold/90 text-slate-900 font-semibold"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Process
                </>
              )}
            </Button>
            {file && !uploading && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-slate-600 text-slate-300"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="p-4 bg-red-900/20 border-red-500">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </Card>
      )}

      {/* Result Display */}
      {result && (
        <Card className="p-6 bg-slate-800">
          <div className="flex items-center gap-2 mb-4">
            {result.success ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            )}
            <h3 className="text-lg font-bold text-slate-100">
              {result.success ? "Upload Successful" : "Upload Completed with Errors"}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-400">Total Records</p>
              <p className="text-xl font-bold text-slate-100">{result.totalRecords}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Processed</p>
              <p className="text-xl font-bold text-green-400">{result.processedRecords}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Failed</p>
              <p className="text-xl font-bold text-red-400">{result.failedRecords}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Success Rate</p>
              <p className="text-xl font-bold text-slate-100">
                {result.totalRecords > 0
                  ? ((result.processedRecords / result.totalRecords) * 100).toFixed(1)
                  : 0}
                %
              </p>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-300 mb-2">Errors:</p>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {result.errors.slice(0, 10).map((err, idx) => (
                  <div key={idx} className="text-xs text-red-400 bg-red-900/20 p-2 rounded">
                    Row {err.row}: {err.message}
                  </div>
                ))}
                {result.errors.length > 10 && (
                  <p className="text-xs text-slate-400">
                    ... and {result.errors.length - 10} more errors
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

