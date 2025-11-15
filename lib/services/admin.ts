import { connectMongo } from "../db";
import { OfficerModel, KPIWeightsModel, AdminModel } from "../models";

export async function getAdminDashboard() {
  await connectMongo();
  const [officers, kpi, admins] = await Promise.all([
    OfficerModel.find().sort({ createdAt: -1 }).limit(20).lean(),
    KPIWeightsModel.findOne().lean(),
    AdminModel.find().select("-password").lean()
  ]);

  if (!officers.length) {
    const { getDemoOfficers } = await import("../demo");
    const demoOfficers = getDemoOfficers(10);
    return {
      officers: demoOfficers.map((officer, index) => ({
        id: `${index}`,
        name: officer.name,
        badgeId: officer.badgeId,
        department: officer.department,
        designation: officer.designation,
        totalScore: officer.totalScore
      })),
      kpiWeights: {
        caseClosedWeight: 0.4,
        cyberResolvedWeight: 0.3,
        feedbackWeight: 0.2,
        awarenessWeight: 0.1
      },
      admins: [
        { id: "1", username: "superadmin", role: "SuperAdmin" },
        { id: "2", username: "hq_admin", role: "Admin" }
      ]
    };
  }

  return {
    officers: officers.map((officer) => ({
      id: officer._id.toString(),
      name: officer.name,
      badgeId: officer.badgeId,
      department: officer.department,
      designation: officer.designation,
      totalScore: officer.totalScore
    })),
    kpiWeights: kpi ?? {
      caseClosedWeight: 0.4,
      cyberResolvedWeight: 0.3,
      feedbackWeight: 0.2,
      awarenessWeight: 0.1
    },
    admins: admins.map((admin) => ({
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role
    }))
  };
}


