import "dotenv/config";
import { connectMongo } from "../lib/db";
import { OfficerModel, CCTNSDataModel, RecognitionModel } from "../lib/models";
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
import { ImportLogModel } from "../lib/models";

// All 30 districts of Odisha
const odishaDistricts = [
  "Angul",
  "Balangir",
  "Balasore",
  "Bargarh",
  "Bhadrak",
  "Boudh",
  "Cuttack",
  "Deogarh",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapara",
  "Kendujhar",
  "Khordha",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nayagarh",
  "Nuapada",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur",
  "Sundargarh"
];

const departments = [
  "Cyber Cell",
  "Crime Branch",
  "Traffic",
  "Women & Child",
  "Special Task Force",
  "Narcotics",
  "Anti-Terrorism",
  "Intelligence",
  "Patrol",
  "Investigation"
];

const designations = [
  "Inspector",
  "Sub-Inspector",
  "ASI",
  "DSP",
  "Head Constable",
  "Constable",
  "ACP",
  "DCP"
];

const driveNames = [
  "Operation Clean Sweep",
  "Anti-Drug Campaign",
  "Traffic Safety Drive",
  "Cyber Crime Prevention",
  "Women Safety Initiative",
  "Night Patrol Operation",
  "Community Policing Drive",
  "Crime Prevention Week"
];

const crimeTypes = [
  "Theft",
  "Assault",
  "Fraud",
  "Drug Possession",
  "Cyber Crime",
  "Domestic Violence",
  "Robbery",
  "Murder",
  "Kidnapping",
  "Extortion"
];

const crimeCategories = [
  "Narcotics",
  "Cyber Crime",
  "Property Crime",
  "Violent Crime",
  "Financial Crime",
  "Organized Crime"
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function generateBadgeId(index: number): string {
  return `OD${String(1000 + index).padStart(4, "0")}`;
}

function generateOfficerName(index: number): string {
  const firstNames = [
    "Rajesh",
    "Priya",
    "Amit",
    "Sneha",
    "Vikram",
    "Anjali",
    "Rohit",
    "Kavita",
    "Suresh",
    "Meera",
    "Arjun",
    "Divya",
    "Kiran",
    "Pooja",
    "Manoj",
    "Swati",
    "Nikhil",
    "Riya",
    "Deepak",
    "Shreya",
    "Prabhat",
    "Sangita",
    "Bikash",
    "Rashmi",
    "Sourav",
    "Anita",
    "Debasis",
    "Madhuri",
    "Siddharth",
    "Pratibha"
  ];
  const lastNames = [
    "Kumar",
    "Mohanty",
    "Patnaik",
    "Das",
    "Behera",
    "Sahoo",
    "Panda",
    "Rout",
    "Mishra",
    "Nayak"
  ];
  return `${randomElement(firstNames)} ${randomElement(lastNames)} ${index}`;
}

async function generateOfficers(count: number) {
  console.log(`Generating ${count} officers across ${odishaDistricts.length} Odisha districts...`);
  const officers = [];
  const officersPerDistrict = Math.floor(count / odishaDistricts.length);
  const remainder = count % odishaDistricts.length;

  let officerIndex = 0;
  for (let d = 0; d < odishaDistricts.length; d++) {
    const district = odishaDistricts[d];
    const districtCount = officersPerDistrict + (d < remainder ? 1 : 0);

    for (let i = 0; i < districtCount; i++) {
      const caseClosed = randomInt(0, 200);
      const cyberResolved = randomInt(0, 100);
      const feedbackScore = randomFloat(3.5, 5.0);
      const awarenessPrograms = randomInt(0, 25);
      const emergencyResponses = randomInt(0, 300);

      const totalScore =
        0.4 * caseClosed + 0.3 * cyberResolved + 0.2 * feedbackScore * 10 + 0.1 * awarenessPrograms;

      officers.push({
        name: generateOfficerName(officerIndex),
        badgeId: generateBadgeId(officerIndex),
        department: randomElement(departments),
        designation: randomElement(designations),
        district: district,
        caseClosed,
        cyberResolved,
        feedbackScore,
        awarenessPrograms,
        emergencyResponses,
        totalScore: Number(totalScore.toFixed(2)),
        lastUpdated: new Date(Date.now() - randomInt(0, 180) * 24 * 60 * 60 * 1000)
      });
      officerIndex++;
    }
  }

  await OfficerModel.insertMany(officers);
  console.log(`✓ Created ${officers.length} officers across all Odisha districts`);
  return officers;
}

async function generateCCTNSData(officers: any[], count: number) {
  console.log(`Generating ${count} CCTNS data entries...`);

  const dummyImportLog = await ImportLogModel.create({
    filename: "odisha-seed-data-import.csv",
    source: "Manual",
    status: "completed",
    uploadedBy: "system",
    totalRecords: count,
    processedRecords: count,
    failedRecords: 0,
    errors: []
  });

  const modules: Array<"SpecialDrives" | "Convictions" | "Detections"> = [
    "SpecialDrives",
    "Convictions",
    "Detections"
  ];

  const cctnsEntries = [];

  for (let i = 0; i < count; i++) {
    const officer = randomElement(officers);
    const module = randomElement(modules);
    const baseDate = new Date(Date.now() - randomInt(0, 180) * 24 * 60 * 60 * 1000);

    let entry: any = {
      module,
      officerBadgeId: officer.badgeId,
      officerName: officer.name,
      department: officer.department,
      district: officer.district,
      rawData: {},
      importLogId: dummyImportLog._id
    };

    if (module === "SpecialDrives") {
      entry.driveName = randomElement(driveNames);
      entry.driveDate = new Date(baseDate);
      entry.casesHandled = randomInt(1, 60);
    } else if (module === "Convictions") {
      entry.caseNumber = `CASE-${randomInt(1000, 9999)}/${new Date().getFullYear()}`;
      entry.convictionDate = new Date(baseDate);
      entry.crimeType = randomElement(crimeTypes);
      entry.courtName = `${officer.district} District Court`;
    } else if (module === "Detections") {
      entry.detectionDate = new Date(baseDate);
      entry.crimeCategory = randomElement(crimeCategories);
      entry.valueRecovered = randomInt(1000, 600000);
    }

    cctnsEntries.push(entry);
  }

  await CCTNSDataModel.insertMany(cctnsEntries);
  console.log(`✓ Created ${count} CCTNS data entries`);
}

async function generateRecognitions(count: number) {
  console.log(`Generating ${count} recognitions...`);

  const officers = await OfficerModel.find().lean();
  if (officers.length === 0) {
    console.log("No officers found, skipping recognitions");
    return;
  }

  const badges: Array<"Gold" | "Silver" | "Bronze"> = ["Gold", "Silver", "Bronze"];
  const months = [
    "2024-01",
    "2024-02",
    "2024-03",
    "2024-04",
    "2024-05",
    "2024-06",
    "2024-07",
    "2024-08",
    "2024-09",
    "2024-10",
    "2024-11",
    "2024-12",
    "2025-01",
    "2025-02",
    "2025-03"
  ];

  const recognitions = [];
  const topOfficers = officers
    .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
    .slice(0, Math.floor(count * 0.2));

  for (let i = 0; i < count; i++) {
    let officer;
    let badge: "Gold" | "Silver" | "Bronze";

    if (i < topOfficers.length) {
      officer = topOfficers[i];
      badge = "Gold";
    } else if (i < count * 0.5) {
      officer = randomElement(officers.filter((o) => (o.totalScore || 0) > 50));
      badge = "Silver";
    } else {
      officer = randomElement(officers);
      badge = "Bronze";
    }

    if (!officer || !officer._id) {
      continue;
    }

    recognitions.push({
      officerId: officer._id,
      month: randomElement(months),
      badge,
      message: `Outstanding performance in ${randomElement([
        "crime prevention",
        "cyber security",
        "community service",
        "case resolution",
        "public safety"
      ])}.`,
      recognizedBy: randomElement(["HQ", "DGP", "SP", "Commissioner"]),
      date: new Date(Date.now() - randomInt(0, 120) * 24 * 60 * 60 * 1000)
    });
  }

  await RecognitionModel.insertMany(recognitions);
  console.log(`✓ Created ${recognitions.length} recognitions`);
}

async function generateSpecialDrivesData() {
  console.log("Generating Special Drives data for all Odisha districts...");

  // NBW Drive Data
  const nbwData = odishaDistricts.map((district) => {
    const pendingStart = randomInt(50, 600);
    const received = randomInt(10, 120);
    const executed = randomInt(20, 180);
    const otherwiseDisposed = randomInt(5, 60);
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
      nbwExecutedSTGR: randomInt(5, 40),
      nbwExecutedST: randomInt(3, 25),
      nbwExecutedGR: randomInt(2, 20),
      nbwExecutedOther: randomInt(10, 120),
      totalRecalled: randomInt(0, 25),
      returned: randomInt(0, 20),
      totalBefore: pendingStart,
      driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
    };
  });
  await NBWDriveModel.insertMany(nbwData);
  console.log(`✓ Created ${nbwData.length} NBW drive entries`);

  // Firearms Drive Data
  const firearmsData = odishaDistricts.map((district) => ({
    district,
    casesRegistered: randomInt(5, 60),
    personsArrested: randomInt(3, 50),
    gunsRifles: randomInt(0, 25),
    pistols: randomInt(0, 35),
    revolvers: randomInt(0, 20),
    mouzers: randomInt(0, 12),
    ak47: randomInt(0, 8),
    slr: randomInt(0, 10),
    others: randomInt(0, 20),
    ammunition: randomInt(0, 600),
    cartridges: randomInt(0, 1200),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await FirearmsDriveModel.insertMany(firearmsData);
  console.log(`✓ Created ${firearmsData.length} Firearms drive entries`);

  // Sand Mining Drive Data
  const sandMiningData = odishaDistricts.map((district) => ({
    district,
    casesRegistered: randomInt(2, 40),
    vehiclesSeized: randomInt(1, 25),
    personsArrested: randomInt(1, 30),
    noticeServed: randomInt(5, 60),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await SandMiningDriveModel.insertMany(sandMiningData);
  console.log(`✓ Created ${sandMiningData.length} Sand Mining drive entries`);

  // Missing Persons Drive Data
  const missingPersonsData = odishaDistricts.map((district) => ({
    district,
    boyMissingStart: randomInt(0, 25),
    boyMissingDuring: randomInt(0, 12),
    boyTraced: randomInt(0, 18),
    girlMissingStart: randomInt(0, 30),
    girlMissingDuring: randomInt(0, 15),
    girlTraced: randomInt(0, 25),
    maleMissingStart: randomInt(0, 35),
    maleMissingDuring: randomInt(0, 18),
    maleTraced: randomInt(0, 30),
    femaleMissingStart: randomInt(0, 40),
    femaleMissingDuring: randomInt(0, 20),
    femaleTraced: randomInt(0, 35),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await MissingPersonsDriveModel.insertMany(missingPersonsData);
  console.log(`✓ Created ${missingPersonsData.length} Missing Persons drive entries`);

  // Case Pendency Drive Data
  const casePendencyData = odishaDistricts.map((district) => {
    const casesReported = randomInt(500, 6000);
    const pending30Days = randomInt(100, 2500);
    const pendencyPercent = Number(((pending30Days / casesReported) * 100).toFixed(2));
    return {
      district,
      casesReportedYear: casesReported,
      casesPending30Days: pending30Days,
      pendencyPercent,
      targetCasesToClose: randomInt(50, 600),
      casesClosedInDrive: randomInt(30, 500),
      driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
    };
  });
  await CasePendencyDriveModel.insertMany(casePendencyData);
  console.log(`✓ Created ${casePendencyData.length} Case Pendency drive entries`);

  // Preventive Measures Drive Data
  const preventiveMeasuresData = odishaDistricts.map((district) => ({
    district,
    notice129BNSS: randomInt(0, 60),
    boundDown129BNSS: randomInt(0, 50),
    notice126BNSS: randomInt(0, 55),
    boundDown126BNSS: randomInt(0, 45),
    bookedUnderNSA: randomInt(0, 12),
    nbwExecuted: randomInt(0, 35),
    casesForcibleChanda: randomInt(0, 25),
    arrestsForChanda: randomInt(0, 30),
    blockingsBorderSealings: randomInt(0, 18),
    actionAgainstOrganizedCrime: randomInt(0, 25),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await PreventiveMeasuresDriveModel.insertMany(preventiveMeasuresData);
  console.log(`✓ Created ${preventiveMeasuresData.length} Preventive Measures drive entries`);

  // Excise Act Data
  const exciseData = odishaDistricts.map((district) => ({
    district,
    exciseCasesRegistered: randomInt(5, 50),
    personsArrested: randomInt(3, 40),
    detailsOfSeizure: `Seized ${randomInt(10, 600)} liters of illegal liquor and ${randomInt(5, 60)} bottles`,
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await ExciseActModel.insertMany(exciseData);
  console.log(`✓ Created ${exciseData.length} Excise Act entries`);

  // OPG Act Data
  const opgData = odishaDistricts.map((district) => ({
    district,
    opgCasesRegistered: randomInt(3, 35),
    personsArrested: randomInt(2, 30),
    detailsOfSeizure: `Seized property worth ₹${randomInt(10000, 600000)} and documents`,
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await OPGActModel.insertMany(opgData);
  console.log(`✓ Created ${opgData.length} OPG Act entries`);

  // Narcotics Enforcement Data
  const narcoticsData = odishaDistricts.map((district) => ({
    district,
    casesRegistered: randomInt(5, 60),
    personsArrested: randomInt(3, 50),
    ganja: randomFloat(0, 600),
    brownSugar: randomFloat(0, 60),
    vehicles: randomInt(0, 18),
    ganjaPlantsDestroyed: randomInt(0, 1200),
    bhang: randomFloat(0, 250),
    opium: randomFloat(0, 35),
    coughSyrup: randomInt(0, 600),
    cash: randomInt(50000, 2500000),
    driveDate: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
  }));
  await NarcoticsEnforcementModel.insertMany(narcoticsData);
  console.log(`✓ Created ${narcoticsData.length} Narcotics Enforcement entries`);
}

async function seedOdishaData() {
  console.log("🚀 Starting Odisha State Data Seeding...");
  console.log(`📍 Generating data for all ${odishaDistricts.length} Odisha districts\n`);

  console.log("Connecting to MongoDB...");
  await connectMongo();
  console.log("✓ Connected to MongoDB\n");

  // Clear existing data
  console.log("Clearing existing data...");
  await OfficerModel.deleteMany({});
  await CCTNSDataModel.deleteMany({});
  await RecognitionModel.deleteMany({});
  await NBWDriveModel.deleteMany({});
  await FirearmsDriveModel.deleteMany({});
  await SandMiningDriveModel.deleteMany({});
  await MissingPersonsDriveModel.deleteMany({});
  await CasePendencyDriveModel.deleteMany({});
  await PreventiveMeasuresDriveModel.deleteMany({});
  await ExciseActModel.deleteMany({});
  await OPGActModel.deleteMany({});
  await NarcoticsEnforcementModel.deleteMany({});
  await ImportLogModel.deleteMany({});
  console.log("✓ Cleared existing data\n");

  // Generate 1000 officers distributed across all Odisha districts
  const officers = await generateOfficers(1000);
  console.log("");

  // Generate CCTNS data (approximately 2-3 entries per officer)
  await generateCCTNSData(officers, 2500);
  console.log("");

  // Generate recognitions
  await generateRecognitions(500);
  console.log("");

  // Generate Special Drives data for all districts
  await generateSpecialDrivesData();
  console.log("");

  console.log("✅ Odisha State Data Seeding Complete!");
  console.log("\n📊 Summary:");
  console.log(`   👮 Officers: ${officers.length} (distributed across ${odishaDistricts.length} districts)`);
  console.log(`   📝 CCTNS Data: 2500 entries`);
  console.log(`   🏆 Recognitions: 500 entries`);
  console.log(`   📋 Special Drives: ${odishaDistricts.length} entries per drive type`);
  console.log(`\n📍 Districts Covered: ${odishaDistricts.join(", ")}`);
  console.log("\n🎉 All data is now ready for testing with Odisha state focus!");

  process.exit(0);
}

seedOdishaData().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});

