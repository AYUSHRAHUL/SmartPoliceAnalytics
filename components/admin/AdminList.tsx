"use client";

import { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";

type Admin = {
  id: string;
  username: string;
  role: "Officer" | "Admin" | "SuperAdmin";
};

const roles: Admin["role"][] = ["Officer", "Admin", "SuperAdmin"];

export function AdminList({ admins: initialAdmins }: { admins: Admin[] }) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [message, setMessage] = useState<string | null>(null);

  const updateRole = async (id: string, role: Admin["role"]) => {
    setMessage(null);
    try {
      await axios.put(`/api/admins/${id}`, { role });
      setAdmins((prev) =>
        prev.map((admin) => (admin.id === id ? { ...admin, role } : admin))
      );
      setMessage("Role updated successfully");
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setMessage(axiosError?.response?.data?.message ?? "Failed to update role");
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-100">Admin Users</h2>
        <p className="text-xs text-slate-500">
          Promote officers to admin roles or change access levels.
        </p>
      </div>
      <div className="space-y-3">
        {admins.map((admin) => (
          <div key={admin.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#0f172a] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">{admin.username}</p>
              <p className="text-xs text-slate-500">{admin.id}</p>
            </div>
            <select
              className="rounded-lg border border-slate-700 bg-[#101931] px-3 py-2 text-xs text-slate-200 focus:border-gold focus:outline-none"
              value={admin.role}
              onChange={(e) => updateRole(admin.id, e.target.value as Admin["role"])}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {message && <p className="mt-4 text-center text-xs text-slate-500">{message}</p>}
    </Card>
  );
}


