import "dotenv/config";
import { connectMongo } from "../lib/db";
import { OfficerModel, CCTNSDataModel, RecognitionModel, KPIWeightsModel } from "../lib/models";
import { hashPassword } from "../lib/auth";

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
  "Surat",
  "Indore",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara"
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
  return `BDG${String(1000 + index).padStart(4, "0")}`;
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
    "Shreya"
  ];
  const lastNames = [
    "Kumar",
    "Sharma",
    "Patel",
    "Singh",
    "Reddy",
    "Verma",
    "Gupta",
    "Joshi",
    "Mehta",
    "Desai"
  ];
  return `${randomElement(firstNames)} ${randomElement(lastNames)} ${index}`;
}

async function generateOfficers(count: number) {
  console.log(`Generating ${count} officers...`);
  const officers = [];

  for (let i = 0; i < count; i++) {
    const caseClosed = randomInt(0, 150);
    const cyberResolved = randomInt(0, 80);
    const feedbackScore = randomFloat(3.0, 5.0);
    const awarenessPrograms = randomInt(0, 20);
    const emergencyResponses = randomInt(0, 250);

    // Calculate total score using default KPI weights
    const totalScore =
      0.4 * caseClosed +
      0.3 * cyberResolved +
      0.2 * feedbackScore * 10 +
      0.1 * awarenessPrograms;

    const officer = {
      name: generateOfficerName(i),
      badgeId: generateBadgeId(i),
      department: randomElement(departments),
      designation: randomElement(designations),
      district: randomElement(districts),
      caseClosed,
      cyberResolved,
      feedbackScore,
      awarenessPrograms,
      emergencyResponses,
      totalScore: Number(totalScore.toFixed(2)),
      lastUpdated: new Date(Date.now() - randomInt(0, 90) * 24 * 60 * 60 * 1000)
    };

    officers.push(officer);
  }

  await OfficerModel.insertMany(officers);
  console.log(`✓ Created ${count} officers`);
  return officers;
}

async function generateCCTNSData(officers: any[], count: number) {
  console.log(`Generating ${count} CCTNS data entries...`);

  // Create a dummy import log for seed data
  const { ImportLogModel } = await import("../lib/models");
  const dummyImportLog = await ImportLogModel.create({
    filename: "seed-data-import.csv",
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
      entry.casesHandled = randomInt(1, 50);
    } else if (module === "Convictions") {
      entry.caseNumber = `CASE-${randomInt(1000, 9999)}/${new Date().getFullYear()}`;
      entry.convictionDate = new Date(baseDate);
      entry.crimeType = randomElement(crimeTypes);
      entry.courtName = `${randomElement(districts)} District Court`;
    } else if (module === "Detections") {
      entry.detectionDate = new Date(baseDate);
      entry.crimeCategory = randomElement(crimeCategories);
      entry.valueRecovered = randomInt(1000, 500000);
    }

    cctnsEntries.push(entry);
  }

  await CCTNSDataModel.insertMany(cctnsEntries);
  console.log(`✓ Created ${count} CCTNS data entries`);
}

async function generateRecognitions(count: number) {
  console.log(`Generating ${count} recognitions...`);

  // Fetch officers from database to get their _id
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

  // Get top performers for Gold badges
  const topOfficers = officers
    .sort((a: any, b: any) => (b.totalScore || 0) - (a.totalScore || 0))
    .slice(0, Math.floor(count * 0.2));

  for (let i = 0; i < count; i++) {
    let officer;
    let badge: "Gold" | "Silver" | "Bronze";

    if (i < topOfficers.length) {
      officer = topOfficers[i];
      badge = "Gold";
    } else if (i < count * 0.5) {
      officer = randomElement(officers.filter((o: any) => (o.totalScore || 0) > 50));
      badge = "Silver";
    } else {
      officer = randomElement(officers);
      badge = "Bronze";
    }

    if (!officer || !officer._id) {
      continue; // Skip if no valid officer
    }

    const recognition = {
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
    };

    recognitions.push(recognition);
  }

  await RecognitionModel.insertMany(recognitions);
  console.log(`✓ Created ${recognitions.length} recognitions`);
}

async function seedFakeData() {
  console.log("Connecting to MongoDB...");
  await connectMongo();
  console.log("✓ Connected to MongoDB");

  // Ensure KPI weights exist
  const weights = await KPIWeightsModel.findOne();
  if (!weights) {
    await KPIWeightsModel.create({});
    console.log("✓ Created default KPI weights");
  }

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("Clearing existing data...");
  await OfficerModel.deleteMany({});
  await CCTNSDataModel.deleteMany({});
  await RecognitionModel.deleteMany({});
  console.log("✓ Cleared existing data");

  // Generate 500 officers
  const officers = await generateOfficers(500);

  // Generate CCTNS data (approximately 2-3 entries per officer)
  await generateCCTNSData(officers, 1200);

  // Generate recognitions (approximately 1 per 2 officers)
  await generateRecognitions(250);

  console.log("\n✅ Fake data seeding complete!");
  console.log(`   - ${officers.length} Officers`);
  console.log(`   - 1200 CCTNS Data Entries`);
  console.log(`   - 250 Recognitions`);
  console.log("\nYou can now test the dashboard with realistic data.");

  process.exit(0);
}

seedFakeData().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});

