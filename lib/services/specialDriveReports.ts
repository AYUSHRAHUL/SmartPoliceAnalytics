import { connectMongo } from "../db";
import {
  NBWDriveModel,
  FirearmsDriveModel,
  SandMiningDriveModel,
  MissingPersonsDriveModel,
  CasePendencyDriveModel,
  PreventiveMeasuresDriveModel,
  ExciseActModel,
  OPGActModel,
  NarcoticsEnforcementModel
} from "../models/SpecialDrive";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export type DriveType =
  | "nbw"
  | "firearms"
  | "sand-mining"
  | "missing-persons"
  | "case-pendency"
  | "preventive-measures"
  | "excise"
  | "opg"
  | "narcotics";

/**
 * Generate PDF report for NBW Drive
 */
export async function generateNBWPDF(): Promise<Buffer> {
  await connectMongo();
  const data = await NBWDriveModel.find().sort({ district: 1 }).lean();

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30, size: "A4", layout: "landscape" });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks as readonly Uint8Array[])));
    doc.on("error", reject);

    // Header
    doc.fontSize(16).text("Special Drive Against Pending NBWs", { align: "center" });
    doc.moveDown();
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`, {
      align: "center"
    });
    doc.moveDown(2);

    // Table Header
    const startY = doc.y;
    const rowHeight = 20;
    const colWidths = [60, 50, 40, 40, 50, 50, 50, 40, 30, 30, 30];
    const headers = [
      "District",
      "Pending Start",
      "Received",
      "Executed",
      "Otherwise Disposed",
      "Total Disposed",
      "Pending End",
      "ST/GR",
      "ST",
      "GR",
      "Other"
    ];

    let x = 30;
    headers.forEach((header, i) => {
      doc.fontSize(8).text(header, x, startY, { width: colWidths[i], align: "center" });
      x += colWidths[i];
    });

    // Table Data
    let y = startY + rowHeight;
    data.forEach((row) => {
      if (y > 500) {
        doc.addPage();
        y = 30;
      }

      x = 30;
      const values = [
        row.district,
        row.totalNBWPendingStart.toString(),
        row.nbwReceived.toString(),
        row.nbwExecutedDuringDrive.toString(),
        row.nbwOtherwiseDisposed.toString(),
        row.totalDisposed.toString(),
        row.nbwPendingEnd.toString(),
        row.nbwExecutedSTGR.toString(),
        row.nbwExecutedST.toString(),
        row.nbwExecutedGR.toString(),
        row.nbwExecutedOther.toString()
      ];

      values.forEach((value, i) => {
        doc.fontSize(7).text(value, x, y, { width: colWidths[i], align: "center" });
        x += colWidths[i];
      });

      y += rowHeight;
    });

    // Totals
    if (data.length > 0) {
      y += 10;
      x = 30;
      const totals = [
        "TOTAL",
        data.reduce((sum, r) => sum + r.totalNBWPendingStart, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwReceived, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwExecutedDuringDrive, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwOtherwiseDisposed, 0).toString(),
        data.reduce((sum, r) => sum + r.totalDisposed, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwPendingEnd, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwExecutedSTGR, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwExecutedST, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwExecutedGR, 0).toString(),
        data.reduce((sum, r) => sum + r.nbwExecutedOther, 0).toString()
      ];

      totals.forEach((value, i) => {
        doc.fontSize(8).font("Helvetica-Bold").text(value, x, y, {
          width: colWidths[i],
          align: "center"
        });
        x += colWidths[i];
      });
    }

    doc.end();
  });
}

/**
 * Generate Excel report for NBW Drive
 */
export async function generateNBWExcel(): Promise<Buffer> {
  await connectMongo();
  const data = await NBWDriveModel.find().sort({ district: 1 }).lean();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("NBW Drive Report");

  // Header
  sheet.mergeCells("A1:K1");
  sheet.getCell("A1").value = "Special Drive Against Pending NBWs";
  sheet.getCell("A1").font = { size: 14, bold: true };
  sheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };

  sheet.mergeCells("A2:K2");
  sheet.getCell("A2").value = `Generated on: ${new Date().toLocaleDateString()}`;
  sheet.getCell("A2").alignment = { horizontal: "center" };

  // Column Headers
  sheet.columns = [
    { header: "District Name", key: "district", width: 20 },
    { header: "Total NBW Pending (01.08.2025)", key: "totalNBWPendingStart", width: 18 },
    { header: "NBW Received", key: "nbwReceived", width: 12 },
    { header: "Total", key: "total", width: 10 },
    { header: "NBWs Executed During Special Drive", key: "nbwExecutedDuringDrive", width: 20 },
    { header: "NBWs Otherwise Disposed", key: "nbwOtherwiseDisposed", width: 18 },
    { header: "Total Disposed", key: "totalDisposed", width: 14 },
    { header: "NBW Pending (08.08.2025)", key: "nbwPendingEnd", width: 18 },
    { header: "NBW Executed in ST/GR Cases", key: "nbwExecutedSTGR", width: 20 },
    { header: "NBW Executed in ST Cases", key: "nbwExecutedST", width: 18 },
    { header: "NBW Executed in GR Cases", key: "nbwExecutedGR", width: 18 },
    { header: "NBW Executed in Other Cases", key: "nbwExecutedOther", width: 20 }
  ];

  // Style header row
  sheet.getRow(3).font = { bold: true };
  sheet.getRow(3).alignment = { horizontal: "center", vertical: "middle" };
  sheet.getRow(3).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" }
  };

  // Add data
  data.forEach((row) => {
    sheet.addRow({
      district: row.district,
      totalNBWPendingStart: row.totalNBWPendingStart,
      nbwReceived: row.nbwReceived,
      total: row.total,
      nbwExecutedDuringDrive: row.nbwExecutedDuringDrive,
      nbwOtherwiseDisposed: row.nbwOtherwiseDisposed,
      totalDisposed: row.totalDisposed,
      nbwPendingEnd: row.nbwPendingEnd,
      nbwExecutedSTGR: row.nbwExecutedSTGR,
      nbwExecutedST: row.nbwExecutedST,
      nbwExecutedGR: row.nbwExecutedGR,
      nbwExecutedOther: row.nbwExecutedOther
    });
  });

  // Add totals row
  if (data.length > 0) {
    const totalsRow = sheet.addRow({
      district: "TOTAL",
      totalNBWPendingStart: data.reduce((sum, r) => sum + r.totalNBWPendingStart, 0),
      nbwReceived: data.reduce((sum, r) => sum + r.nbwReceived, 0),
      total: data.reduce((sum, r) => sum + r.total, 0),
      nbwExecutedDuringDrive: data.reduce((sum, r) => sum + r.nbwExecutedDuringDrive, 0),
      nbwOtherwiseDisposed: data.reduce((sum, r) => sum + r.nbwOtherwiseDisposed, 0),
      totalDisposed: data.reduce((sum, r) => sum + r.totalDisposed, 0),
      nbwPendingEnd: data.reduce((sum, r) => sum + r.nbwPendingEnd, 0),
      nbwExecutedSTGR: data.reduce((sum, r) => sum + r.nbwExecutedSTGR, 0),
      nbwExecutedST: data.reduce((sum, r) => sum + r.nbwExecutedST, 0),
      nbwExecutedGR: data.reduce((sum, r) => sum + r.nbwExecutedGR, 0),
      nbwExecutedOther: data.reduce((sum, r) => sum + r.nbwExecutedOther, 0)
    });
    totalsRow.font = { bold: true };
    totalsRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFD700" }
    };
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as Buffer;
}

/**
 * Generate Excel report for Firearms Drive
 */
export async function generateFirearmsExcel(): Promise<Buffer> {
  await connectMongo();
  const data = await FirearmsDriveModel.find().sort({ district: 1 }).lean();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Firearms Drive Report");

  sheet.mergeCells("A1:L1");
  sheet.getCell("A1").value = "Special Drive Against Illegal Firearms";
  sheet.getCell("A1").font = { size: 14, bold: true };
  sheet.getCell("A1").alignment = { horizontal: "center" };

  sheet.columns = [
    { header: "District Name", key: "district", width: 20 },
    { header: "Cases Registered", key: "casesRegistered", width: 15 },
    { header: "Persons Arrested", key: "personsArrested", width: 15 },
    { header: "Guns/Rifles", key: "gunsRifles", width: 12 },
    { header: "Pistols", key: "pistols", width: 10 },
    { header: "Revolvers", key: "revolvers", width: 10 },
    { header: "Mouzers", key: "mouzers", width: 10 },
    { header: "AK-47", key: "ak47", width: 10 },
    { header: "SLR", key: "slr", width: 10 },
    { header: "Others", key: "others", width: 10 },
    { header: "Ammunition", key: "ammunition", width: 12 },
    { header: "Cartridges", key: "cartridges", width: 12 }
  ];

  sheet.getRow(2).font = { bold: true };
  sheet.getRow(2).alignment = { horizontal: "center" };

  data.forEach((row) => {
    sheet.addRow(row);
  });

  if (data.length > 0) {
    const totalsRow = sheet.addRow({
      district: "TOTAL",
      casesRegistered: data.reduce((sum, r) => sum + r.casesRegistered, 0),
      personsArrested: data.reduce((sum, r) => sum + r.personsArrested, 0),
      gunsRifles: data.reduce((sum, r) => sum + r.gunsRifles, 0),
      pistols: data.reduce((sum, r) => sum + r.pistols, 0),
      revolvers: data.reduce((sum, r) => sum + r.revolvers, 0),
      mouzers: data.reduce((sum, r) => sum + r.mouzers, 0),
      ak47: data.reduce((sum, r) => sum + r.ak47, 0),
      slr: data.reduce((sum, r) => sum + r.slr, 0),
      others: data.reduce((sum, r) => sum + r.others, 0),
      ammunition: data.reduce((sum, r) => sum + r.ammunition, 0),
      cartridges: data.reduce((sum, r) => sum + r.cartridges, 0)
    });
    totalsRow.font = { bold: true };
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as Buffer;
}

/**
 * Generate Excel report for Narcotics Enforcement
 */
export async function generateNarcoticsExcel(): Promise<Buffer> {
  await connectMongo();
  const data = await NarcoticsEnforcementModel.find().sort({ district: 1 }).lean();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Narcotics Enforcement Report");

  sheet.mergeCells("A1:K1");
  sheet.getCell("A1").value = "Narcotics Drug Enforcement";
  sheet.getCell("A1").font = { size: 14, bold: true };
  sheet.getCell("A1").alignment = { horizontal: "center" };

  sheet.columns = [
    { header: "District", key: "district", width: 20 },
    { header: "Cases Registered", key: "casesRegistered", width: 15 },
    { header: "Persons Arrested", key: "personsArrested", width: 15 },
    { header: "Ganja (kg)", key: "ganja", width: 12 },
    { header: "Brown Sugar (kg)", key: "brownSugar", width: 15 },
    { header: "Vehicles", key: "vehicles", width: 10 },
    { header: "Ganja Plants Destroyed", key: "ganjaPlantsDestroyed", width: 18 },
    { header: "Bhang (kg)", key: "bhang", width: 12 },
    { header: "Opium (kg)", key: "opium", width: 12 },
    { header: "Cough Syrup", key: "coughSyrup", width: 12 },
    { header: "Cash (₹)", key: "cash", width: 15 }
  ];

  sheet.getRow(2).font = { bold: true };
  sheet.getRow(2).alignment = { horizontal: "center" };

  data.forEach((row) => {
    sheet.addRow({
      ...row,
      ganja: Number(row.ganja.toFixed(2)),
      brownSugar: Number(row.brownSugar.toFixed(2)),
      bhang: Number(row.bhang.toFixed(2)),
      opium: Number(row.opium.toFixed(2)),
      cash: Number(row.cash.toFixed(2))
    });
  });

  if (data.length > 0) {
    const totalsRow = sheet.addRow({
      district: "TOTAL",
      casesRegistered: data.reduce((sum, r) => sum + r.casesRegistered, 0),
      personsArrested: data.reduce((sum, r) => sum + r.personsArrested, 0),
      ganja: Number(data.reduce((sum, r) => sum + r.ganja, 0).toFixed(2)),
      brownSugar: Number(data.reduce((sum, r) => sum + r.brownSugar, 0).toFixed(2)),
      vehicles: data.reduce((sum, r) => sum + r.vehicles, 0),
      ganjaPlantsDestroyed: data.reduce((sum, r) => sum + r.ganjaPlantsDestroyed, 0),
      bhang: Number(data.reduce((sum, r) => sum + r.bhang, 0).toFixed(2)),
      opium: Number(data.reduce((sum, r) => sum + r.opium, 0).toFixed(2)),
      coughSyrup: data.reduce((sum, r) => sum + r.coughSyrup, 0),
      cash: Number(data.reduce((sum, r) => sum + r.cash, 0).toFixed(2))
    });
    totalsRow.font = { bold: true };
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as Buffer;
}

