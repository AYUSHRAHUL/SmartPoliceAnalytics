import "dotenv/config";
import { connectMongo } from "../lib/db";
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
} from "../lib/models/SpecialDrive";

const districts = [
  "Pune",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Ganjam",
  "Bhubaneswar",
  "Cuttack",
  "Nagpur",
  "Surat"
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function seedSpecialDrives() {
  console.log("Connecting to MongoDB...");
  await connectMongo();
  console.log("✓ Connected to MongoDB");

  // Clear existing data
  console.log("Clearing existing special drive data...");
  await NBWDriveModel.deleteMany({});
  await FirearmsDriveModel.deleteMany({});
  await SandMiningDriveModel.deleteMany({});
  await MissingPersonsDriveModel.deleteMany({});
  await CasePendencyDriveModel.deleteMany({});
  await PreventiveMeasuresDriveModel.deleteMany({});
  await ExciseActModel.deleteMany({});
  await OPGActModel.deleteMany({});
  await NarcoticsEnforcementModel.deleteMany({});
  console.log("✓ Cleared existing data");

  // Generate NBW Drive Data
  console.log("Generating NBW Drive data...");
  const nbwData = districts.map((district) => {
    const pendingStart = randomInt(50, 500);
    const received = randomInt(10, 100);
    const executed = randomInt(20, 150);
    const otherwiseDisposed = randomInt(5, 50);
    const totalDisposed = executed + otherwiseDisposed;
    const pendingEnd = pendingStart + received - totalDisposed;

    return {
      district,
      totalNBWPendingStart: pendingStart,
      nbwReceived: received,
      total: pendingStart + received,
      nbwExecutedDuringDrive: executed,
      nbwOtherwiseDisposed: otherwiseDisposed,
      totalDisposed,
      nbwPendingEnd: Math.max(0, pendingEnd),
      nbwExecutedSTGR: randomInt(5, 30),
      nbwExecutedST: randomInt(3, 20),
      nbwExecutedGR: randomInt(2, 15),
      nbwExecutedOther: randomInt(10, 100),
      totalRecalled: randomInt(0, 20),
      returned: randomInt(0, 15),
      totalBefore: pendingStart,
      driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
    };
  });
  await NBWDriveModel.insertMany(nbwData);
  console.log(`✓ Created ${nbwData.length} NBW drive entries`);

  // Generate Firearms Drive Data
  console.log("Generating Firearms Drive data...");
  const firearmsData = districts.map((district) => ({
    district,
    casesRegistered: randomInt(5, 50),
    personsArrested: randomInt(3, 40),
    gunsRifles: randomInt(0, 20),
    pistols: randomInt(0, 30),
    revolvers: randomInt(0, 15),
    mouzers: randomInt(0, 10),
    ak47: randomInt(0, 5),
    slr: randomInt(0, 8),
    others: randomInt(0, 15),
    ammunition: randomInt(0, 500),
    cartridges: randomInt(0, 1000),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await FirearmsDriveModel.insertMany(firearmsData);
  console.log(`✓ Created ${firearmsData.length} Firearms drive entries`);

  // Generate Sand Mining Drive Data
  console.log("Generating Sand Mining Drive data...");
  const sandMiningData = districts.map((district) => ({
    district,
    casesRegistered: randomInt(2, 30),
    vehiclesSeized: randomInt(1, 20),
    personsArrested: randomInt(1, 25),
    noticeServed: randomInt(5, 50),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await SandMiningDriveModel.insertMany(sandMiningData);
  console.log(`✓ Created ${sandMiningData.length} Sand Mining drive entries`);

  // Generate Missing Persons Drive Data
  console.log("Generating Missing Persons Drive data...");
  const missingPersonsData = districts.map((district) => ({
    district,
    boyMissingStart: randomInt(0, 20),
    boyMissingDuring: randomInt(0, 10),
    boyTraced: randomInt(0, 15),
    girlMissingStart: randomInt(0, 25),
    girlMissingDuring: randomInt(0, 12),
    girlTraced: randomInt(0, 20),
    maleMissingStart: randomInt(0, 30),
    maleMissingDuring: randomInt(0, 15),
    maleTraced: randomInt(0, 25),
    femaleMissingStart: randomInt(0, 35),
    femaleMissingDuring: randomInt(0, 18),
    femaleTraced: randomInt(0, 30),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await MissingPersonsDriveModel.insertMany(missingPersonsData);
  console.log(`✓ Created ${missingPersonsData.length} Missing Persons drive entries`);

  // Generate Case Pendency Drive Data
  console.log("Generating Case Pendency Drive data...");
  const casePendencyData = districts.map((district) => {
    const casesReported = randomInt(500, 5000);
    const pending30Days = randomInt(100, 2000);
    const pendencyPercent = Number(((pending30Days / casesReported) * 100).toFixed(2));
    return {
      district,
      casesReportedYear: casesReported,
      casesPending30Days: pending30Days,
      pendencyPercent,
      targetCasesToClose: randomInt(50, 500),
      casesClosedInDrive: randomInt(30, 400),
      driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
    };
  });
  await CasePendencyDriveModel.insertMany(casePendencyData);
  console.log(`✓ Created ${casePendencyData.length} Case Pendency drive entries`);

  // Generate Preventive Measures Drive Data
  console.log("Generating Preventive Measures Drive data...");
  const preventiveMeasuresData = districts.map((district) => ({
    district,
    notice129BNSS: randomInt(0, 50),
    boundDown129BNSS: randomInt(0, 40),
    notice126BNSS: randomInt(0, 45),
    boundDown126BNSS: randomInt(0, 35),
    bookedUnderNSA: randomInt(0, 10),
    nbwExecuted: randomInt(0, 30),
    casesForcibleChanda: randomInt(0, 20),
    arrestsForChanda: randomInt(0, 25),
    blockingsBorderSealings: randomInt(0, 15),
    actionAgainstOrganizedCrime: randomInt(0, 20),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await PreventiveMeasuresDriveModel.insertMany(preventiveMeasuresData);
  console.log(`✓ Created ${preventiveMeasuresData.length} Preventive Measures drive entries`);

  // Generate Excise Act Data
  console.log("Generating Excise Act data...");
  const exciseData = districts.map((district) => ({
    district,
    exciseCasesRegistered: randomInt(5, 40),
    personsArrested: randomInt(3, 35),
    detailsOfSeizure: `Seized ${randomInt(10, 500)} liters of illegal liquor and ${randomInt(5, 50)} bottles`,
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await ExciseActModel.insertMany(exciseData);
  console.log(`✓ Created ${exciseData.length} Excise Act entries`);

  // Generate OPG Act Data
  console.log("Generating OPG Act data...");
  const opgData = districts.map((district) => ({
    district,
    opgCasesRegistered: randomInt(3, 30),
    personsArrested: randomInt(2, 25),
    detailsOfSeizure: `Seized property worth ₹${randomInt(10000, 500000)} and documents`,
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await OPGActModel.insertMany(opgData);
  console.log(`✓ Created ${opgData.length} OPG Act entries`);

  // Generate Narcotics Enforcement Data
  console.log("Generating Narcotics Enforcement data...");
  const narcoticsData = districts.map((district) => ({
    district,
    casesRegistered: randomInt(5, 50),
    personsArrested: randomInt(3, 45),
    ganja: randomFloat(0, 500),
    brownSugar: randomFloat(0, 50),
    vehicles: randomInt(0, 15),
    ganjaPlantsDestroyed: randomInt(0, 1000),
    bhang: randomFloat(0, 200),
    opium: randomFloat(0, 30),
    coughSyrup: randomInt(0, 500),
    cash: randomInt(50000, 2000000),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await NarcoticsEnforcementModel.insertMany(narcoticsData);
  console.log(`✓ Created ${narcoticsData.length} Narcotics Enforcement entries`);

  console.log("\n✅ Special Drives data seeding complete!");
  console.log(`   - ${nbwData.length} NBW Drive entries`);
  console.log(`   - ${firearmsData.length} Firearms Drive entries`);
  console.log(`   - ${sandMiningData.length} Sand Mining Drive entries`);
  console.log(`   - ${missingPersonsData.length} Missing Persons Drive entries`);
  console.log(`   - ${casePendencyData.length} Case Pendency Drive entries`);
  console.log(`   - ${preventiveMeasuresData.length} Preventive Measures Drive entries`);
  console.log(`   - ${exciseData.length} Excise Act entries`);
  console.log(`   - ${opgData.length} OPG Act entries`);
  console.log(`   - ${narcoticsData.length} Narcotics Enforcement entries`);

  process.exit(0);
}

seedSpecialDrives().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});

