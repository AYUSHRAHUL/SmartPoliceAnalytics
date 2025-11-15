import { FileUpload } from "@/components/data-ingestion/FileUpload";
import { ImportHistory } from "@/components/data-ingestion/ImportHistory";
import { ManualEntryForm } from "@/components/data-ingestion/ManualEntryForm";

export default function DataIngestionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Data Ingestion</h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload and process data from CCTNS modules, Excel, CSV, or PDF files. The system will
          automatically clean, validate, and update officer performance metrics. You can also enter
          data manually using the form below.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FileUpload />
        <ManualEntryForm />
      </div>

      <ImportHistory />
    </div>
  );
}

