import { Schema, model, models } from "mongoose";

// PART-1(a) - Special Drive Against Pending NBWs
export interface NBWDriveDocument {
  district: string;
  totalNBWPendingStart: number; // Total NBW Pending (01.08.2025)
  nbwReceived: number;
  total: number;
  nbwExecutedDuringDrive: number;
  nbwOtherwiseDisposed: number;
  totalDisposed: number;
  nbwPendingEnd: number; // NBW Pending (08.08.2025)
  nbwExecutedSTGR: number; // NBW Executed in ST/GR Cases
  nbwExecutedST: number; // NBW Executed in ST Cases
  nbwExecutedGR: number; // NBW Executed in GR Cases
  nbwExecutedOther: number; // NBW Executed in Other Cases
  totalRecalled: number;
  returned: number;
  totalBefore: number;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// PART-1(b) - Special Drive Against Illegal Firearms
export interface FirearmsDriveDocument {
  district: string;
  casesRegistered: number;
  personsArrested: number;
  gunsRifles: number;
  pistols: number;
  revolvers: number;
  mouzers: number;
  ak47: number;
  slr: number;
  others: number;
  ammunition: number;
  cartridges: number;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// PART-1(c) - Special Drive Against Sand Mining
export interface SandMiningDriveDocument {
  district: string;
  casesRegistered: number;
  vehiclesSeized: number;
  personsArrested: number;
  noticeServed: number;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// PART-1(d) - Special Drive Against Missing Persons
export interface MissingPersonsDriveDocument {
  district: string;
  boyMissingStart: number;
  boyMissingDuring: number;
  boyTraced: number;
  girlMissingStart: number;
  girlMissingDuring: number;
  girlTraced: number;
  maleMissingStart: number;
  maleMissingDuring: number;
  maleTraced: number;
  femaleMissingStart: number;
  femaleMissingDuring: number;
  femaleTraced: number;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// PART-1(f) - Special Drive to Reduce Pendency of Cognizable Cases
export interface CasePendencyDriveDocument {
  district: string;
  casesReportedYear: number;
  casesPending30Days: number;
  pendencyPercent: number;
  targetCasesToClose: number;
  casesClosedInDrive: number;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// PART-1(g) - Special Drive Against Criminals & Anti-socials
export interface PreventiveMeasuresDriveDocument {
  district: string;
  notice129BNSS: number; // Notice u/s 129 BNSS
  boundDown129BNSS: number; // Bound Down u/s 129 BNSS
  notice126BNSS: number; // Notice u/s 126 BNSS
  boundDown126BNSS: number; // Bound Down u/s 126 BNSS
  bookedUnderNSA: number;
  nbwExecuted: number;
  casesForcibleChanda: number; // Cases for Forcible Collection of Chanda
  arrestsForChanda: number;
  blockingsBorderSealings: number;
  actionAgainstOrganizedCrime: number;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Excise Act Table
export interface ExciseActDocument {
  district: string;
  exciseCasesRegistered: number;
  personsArrested: number;
  detailsOfSeizure: string;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// OPG Act Table
export interface OPGActDocument {
  district: string;
  opgCasesRegistered: number;
  personsArrested: number;
  detailsOfSeizure: string;
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// PART-1(g-2) - Narcotics Drug Enforcement
export interface NarcoticsEnforcementDocument {
  district: string;
  casesRegistered: number;
  personsArrested: number;
  ganja: number; // in kg or units
  brownSugar: number; // in kg or units
  vehicles: number;
  ganjaPlantsDestroyed: number;
  bhang: number; // in kg or units
  opium: number; // in kg or units
  coughSyrup: number; // in units
  cash: number; // in rupees
  driveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Schemas
const NBWDriveSchema = new Schema(
  {
    district: { type: String, required: true },
    totalNBWPendingStart: { type: Number, default: 0 },
    nbwReceived: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    nbwExecutedDuringDrive: { type: Number, default: 0 },
    nbwOtherwiseDisposed: { type: Number, default: 0 },
    totalDisposed: { type: Number, default: 0 },
    nbwPendingEnd: { type: Number, default: 0 },
    nbwExecutedSTGR: { type: Number, default: 0 },
    nbwExecutedST: { type: Number, default: 0 },
    nbwExecutedGR: { type: Number, default: 0 },
    nbwExecutedOther: { type: Number, default: 0 },
    totalRecalled: { type: Number, default: 0 },
    returned: { type: Number, default: 0 },
    totalBefore: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const FirearmsDriveSchema = new Schema(
  {
    district: { type: String, required: true },
    casesRegistered: { type: Number, default: 0 },
    personsArrested: { type: Number, default: 0 },
    gunsRifles: { type: Number, default: 0 },
    pistols: { type: Number, default: 0 },
    revolvers: { type: Number, default: 0 },
    mouzers: { type: Number, default: 0 },
    ak47: { type: Number, default: 0 },
    slr: { type: Number, default: 0 },
    others: { type: Number, default: 0 },
    ammunition: { type: Number, default: 0 },
    cartridges: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const SandMiningDriveSchema = new Schema(
  {
    district: { type: String, required: true },
    casesRegistered: { type: Number, default: 0 },
    vehiclesSeized: { type: Number, default: 0 },
    personsArrested: { type: Number, default: 0 },
    noticeServed: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const MissingPersonsDriveSchema = new Schema(
  {
    district: { type: String, required: true },
    boyMissingStart: { type: Number, default: 0 },
    boyMissingDuring: { type: Number, default: 0 },
    boyTraced: { type: Number, default: 0 },
    girlMissingStart: { type: Number, default: 0 },
    girlMissingDuring: { type: Number, default: 0 },
    girlTraced: { type: Number, default: 0 },
    maleMissingStart: { type: Number, default: 0 },
    maleMissingDuring: { type: Number, default: 0 },
    maleTraced: { type: Number, default: 0 },
    femaleMissingStart: { type: Number, default: 0 },
    femaleMissingDuring: { type: Number, default: 0 },
    femaleTraced: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const CasePendencyDriveSchema = new Schema(
  {
    district: { type: String, required: true },
    casesReportedYear: { type: Number, default: 0 },
    casesPending30Days: { type: Number, default: 0 },
    pendencyPercent: { type: Number, default: 0 },
    targetCasesToClose: { type: Number, default: 0 },
    casesClosedInDrive: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const PreventiveMeasuresDriveSchema = new Schema(
  {
    district: { type: String, required: true },
    notice129BNSS: { type: Number, default: 0 },
    boundDown129BNSS: { type: Number, default: 0 },
    notice126BNSS: { type: Number, default: 0 },
    boundDown126BNSS: { type: Number, default: 0 },
    bookedUnderNSA: { type: Number, default: 0 },
    nbwExecuted: { type: Number, default: 0 },
    casesForcibleChanda: { type: Number, default: 0 },
    arrestsForChanda: { type: Number, default: 0 },
    blockingsBorderSealings: { type: Number, default: 0 },
    actionAgainstOrganizedCrime: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const ExciseActSchema = new Schema(
  {
    district: { type: String, required: true },
    exciseCasesRegistered: { type: Number, default: 0 },
    personsArrested: { type: Number, default: 0 },
    detailsOfSeizure: { type: String, default: "" },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const OPGActSchema = new Schema(
  {
    district: { type: String, required: true },
    opgCasesRegistered: { type: Number, default: 0 },
    personsArrested: { type: Number, default: 0 },
    detailsOfSeizure: { type: String, default: "" },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

const NarcoticsEnforcementSchema = new Schema(
  {
    district: { type: String, required: true },
    casesRegistered: { type: Number, default: 0 },
    personsArrested: { type: Number, default: 0 },
    ganja: { type: Number, default: 0 },
    brownSugar: { type: Number, default: 0 },
    vehicles: { type: Number, default: 0 },
    ganjaPlantsDestroyed: { type: Number, default: 0 },
    bhang: { type: Number, default: 0 },
    opium: { type: Number, default: 0 },
    coughSyrup: { type: Number, default: 0 },
    cash: { type: Number, default: 0 },
    driveDate: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
);

// Add indexes
NBWDriveSchema.index({ district: 1, driveDate: -1 });
FirearmsDriveSchema.index({ district: 1, driveDate: -1 });
SandMiningDriveSchema.index({ district: 1, driveDate: -1 });
MissingPersonsDriveSchema.index({ district: 1, driveDate: -1 });
CasePendencyDriveSchema.index({ district: 1, driveDate: -1 });
PreventiveMeasuresDriveSchema.index({ district: 1, driveDate: -1 });
ExciseActSchema.index({ district: 1, driveDate: -1 });
OPGActSchema.index({ district: 1, driveDate: -1 });
NarcoticsEnforcementSchema.index({ district: 1, driveDate: -1 });

// Export models
export const NBWDriveModel =
  (models.NBWDrive as any) || (model("NBWDrive", NBWDriveSchema) as any);

export const FirearmsDriveModel =
  (models.FirearmsDrive as any) || (model("FirearmsDrive", FirearmsDriveSchema) as any);

export const SandMiningDriveModel =
  (models.SandMiningDrive as any) || (model("SandMiningDrive", SandMiningDriveSchema) as any);

export const MissingPersonsDriveModel =
  (models.MissingPersonsDrive as any) || (model("MissingPersonsDrive", MissingPersonsDriveSchema) as any);

export const CasePendencyDriveModel =
  (models.CasePendencyDrive as any) || (model("CasePendencyDrive", CasePendencyDriveSchema) as any);

export const PreventiveMeasuresDriveModel =
  (models.PreventiveMeasuresDrive as any) || (model("PreventiveMeasuresDrive", PreventiveMeasuresDriveSchema) as any);

export const ExciseActModel =
  (models.ExciseAct as any) || (model("ExciseAct", ExciseActSchema) as any);

export const OPGActModel =
  (models.OPGAct as any) || (model("OPGAct", OPGActSchema) as any);

export const NarcoticsEnforcementModel =
  (models.NarcoticsEnforcement as any) || (model("NarcoticsEnforcement", NarcoticsEnforcementSchema) as any);

