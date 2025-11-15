import ExcelJS from "exceljs";
import { parse } from "csv-parse/sync";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require("pdf-parse");

export type FileFormat = "excel" | "csv" | "pdf";

export interface ParsedRow {
  [key: string]: string | number | Date | null | undefined;
}

/**
 * Parse Excel file (xlsx, xls)
 */
export async function parseExcel(buffer: Buffer): Promise<ParsedRow[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error("Excel file has no worksheets");
  }

  const rows: ParsedRow[] = [];
  const headers: string[] = [];

  // Get headers from first row
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber - 1] = String(cell.value || "").trim();
  });

  // Process data rows
  for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
    const row = worksheet.getRow(rowNumber);
    const rowData: ParsedRow = {};

    let hasData = false;
    headers.forEach((header, index) => {
      const cell = row.getCell(index + 1);
      let value: string | number | Date | null = null;

      if (cell.value !== null && cell.value !== undefined) {
        hasData = true;
        if (cell.value instanceof Date) {
          value = cell.value;
        } else if (typeof cell.value === "number") {
          value = cell.value;
        } else {
          value = String(cell.value).trim();
        }
      }

      rowData[header] = value;
    });

    if (hasData) {
      rows.push(rowData);
    }
  }

  return rows;
}

/**
 * Parse CSV file
 */
export async function parseCSV(buffer: Buffer): Promise<ParsedRow[]> {
  const content = buffer.toString("utf-8");
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    cast: (value, context) => {
      // Try to parse numbers
      if (context.column && !isNaN(Number(value)) && value !== "") {
        return Number(value);
      }
      return value;
    }
  });

  return records as ParsedRow[];
}

/**
 * Parse PDF file - extracts text and attempts to parse structured data
 */
export async function parsePDF(buffer: Buffer): Promise<ParsedRow[]> {
  const data = await pdfParse(buffer);
  const text = data.text;

  // PDF parsing is complex - this is a basic implementation
  // For production, you might want to use more sophisticated PDF parsing
  // or require structured PDFs with tables

  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const rows: ParsedRow[] = [];

  // Basic heuristic: look for tab-separated or space-separated data
  // This is a simplified parser - you may need to customize based on your PDF format
  for (const line of lines) {
    const parts = line.split(/\s{2,}|\t/).filter((p) => p.trim().length > 0);
    if (parts.length >= 2) {
      const row: ParsedRow = {};
      parts.forEach((part, index) => {
        row[`column_${index + 1}`] = part.trim();
      });
      rows.push(row);
    }
  }

  return rows;
}

/**
 * Detect file format from buffer or filename
 */
export function detectFileFormat(filename: string, buffer?: Buffer): FileFormat {
  const ext = filename.toLowerCase().split(".").pop();

  switch (ext) {
    case "xlsx":
    case "xls":
      return "excel";
    case "csv":
      return "csv";
    case "pdf":
      return "pdf";
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
}

/**
 * Parse file based on format
 */
export async function parseFile(buffer: Buffer, filename: string): Promise<ParsedRow[]> {
  const format = detectFileFormat(filename, buffer);

  switch (format) {
    case "excel":
      return parseExcel(buffer);
    case "csv":
      return parseCSV(buffer);
    case "pdf":
      return parsePDF(buffer);
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
}

