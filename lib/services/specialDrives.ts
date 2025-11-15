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
 * Get all NBW Drive data
 */
export async function getNBWDriveData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await NBWDriveModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Firearms Drive data
 */
export async function getFirearmsDriveData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await FirearmsDriveModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Sand Mining Drive data
 */
export async function getSandMiningDriveData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await SandMiningDriveModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Missing Persons Drive data
 */
export async function getMissingPersonsDriveData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await MissingPersonsDriveModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Case Pendency Drive data
 */
export async function getCasePendencyDriveData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await CasePendencyDriveModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Preventive Measures Drive data
 */
export async function getPreventiveMeasuresDriveData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await PreventiveMeasuresDriveModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Excise Act data
 */
export async function getExciseActData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await ExciseActModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all OPG Act data
 */
export async function getOPGActData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await OPGActModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get all Narcotics Enforcement data
 */
export async function getNarcoticsEnforcementData(district?: string) {
  await connectMongo();
  const query = district ? { district } : {};
  return await NarcoticsEnforcementModel.find(query).sort({ driveDate: -1 }).lean();
}

/**
 * Get aggregated summary for all drives
 */
export async function getSpecialDrivesSummary() {
  await connectMongo();

  const [
    nbwData,
    firearmsData,
    sandMiningData,
    missingPersonsData,
    casePendencyData,
    preventiveMeasuresData,
    exciseData,
    opgData,
    narcoticsData
  ] = await Promise.all([
    NBWDriveModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalNBWExecuted: { $sum: "$nbwExecutedDuringDrive" },
          totalNBWPending: { $sum: "$nbwPendingEnd" },
          count: { $sum: 1 }
        }
      }
    ]),
    FirearmsDriveModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalCases: { $sum: "$casesRegistered" },
          totalArrests: { $sum: "$personsArrested" },
          totalWeapons: {
            $sum: {
              $add: [
                "$gunsRifles",
                "$pistols",
                "$revolvers",
                "$mouzers",
                "$ak47",
                "$slr",
                "$others"
              ]
            }
          },
          count: { $sum: 1 }
        }
      }
    ]),
    SandMiningDriveModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalCases: { $sum: "$casesRegistered" },
          totalVehiclesSeized: { $sum: "$vehiclesSeized" },
          totalArrests: { $sum: "$personsArrested" },
          count: { $sum: 1 }
        }
      }
    ]),
    MissingPersonsDriveModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalTraced: {
            $sum: {
              $add: [
                "$boyTraced",
                "$girlTraced",
                "$maleTraced",
                "$femaleTraced"
              ]
            }
          },
          totalMissing: {
            $sum: {
              $add: [
                "$boyMissingStart",
                "$girlMissingStart",
                "$maleMissingStart",
                "$femaleMissingStart"
              ]
            }
          },
          count: { $sum: 1 }
        }
      }
    ]),
    CasePendencyDriveModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalCasesClosed: { $sum: "$casesClosedInDrive" },
          avgPendency: { $avg: "$pendencyPercent" },
          count: { $sum: 1 }
        }
      }
    ]),
    PreventiveMeasuresDriveModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalNotices: {
            $sum: {
              $add: ["$notice129BNSS", "$notice126BNSS"]
            }
          },
          totalArrests: { $sum: "$arrestsForChanda" },
          count: { $sum: 1 }
        }
      }
    ]),
    ExciseActModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalCases: { $sum: "$exciseCasesRegistered" },
          totalArrests: { $sum: "$personsArrested" },
          count: { $sum: 1 }
        }
      }
    ]),
    OPGActModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalCases: { $sum: "$opgCasesRegistered" },
          totalArrests: { $sum: "$personsArrested" },
          count: { $sum: 1 }
        }
      }
    ]),
    NarcoticsEnforcementModel.aggregate([
      {
        $group: {
          _id: "$district",
          totalCases: { $sum: "$casesRegistered" },
          totalArrests: { $sum: "$personsArrested" },
          totalCash: { $sum: "$cash" },
          totalVehicles: { $sum: "$vehicles" },
          count: { $sum: 1 }
        }
      }
    ])
  ]);

  return {
    nbw: nbwData,
    firearms: firearmsData,
    sandMining: sandMiningData,
    missingPersons: missingPersonsData,
    casePendency: casePendencyData,
    preventiveMeasures: preventiveMeasuresData,
    excise: exciseData,
    opg: opgData,
    narcotics: narcoticsData
  };
}

