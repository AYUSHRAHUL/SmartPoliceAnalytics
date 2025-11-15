import "dotenv/config";
import { connectMongo } from "../lib/db";
import { AdminModel, KPIWeightsModel } from "../lib/models";
import { hashPassword } from "../lib/auth";

async function seed() {
  console.log("Connecting to MongoDB...");
  await connectMongo();

  const superAdmin = await AdminModel.findOne({ role: "SuperAdmin" });
  if (!superAdmin) {
    const passwordHash = await hashPassword("admin123");
    await AdminModel.create({
      username: "superadmin",
      password: passwordHash,
      role: "SuperAdmin"
    });
    console.log("Created SuperAdmin: superadmin/admin123");
  } else {
    console.log("SuperAdmin already exists");
  }

  const weights = await KPIWeightsModel.findOne();
  if (!weights) {
    await KPIWeightsModel.create({});
    console.log("Created default KPI weights");
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});


