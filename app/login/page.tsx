"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

// Configure axios to send credentials (cookies)
axios.defaults.withCredentials = true;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { username, password }, {
        withCredentials: true
      });
      
      // Store token in localStorage as fallback (cookie is primary)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
      }
      
      // Redirect to dashboard
      router.push(redirect);
      router.refresh(); // Refresh to update auth state
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string; code?: string };
      let errorMessage = axiosError?.response?.data?.message ?? axiosError?.message ?? "Login failed.";
      
      // Provide helpful error messages
      if (axiosError?.response?.status === 401) {
        errorMessage = "Invalid username or password. If this is your first time, click 'Seed DB' to create the demo account.";
      } else if (axiosError?.response?.status === 0 || axiosError?.code === "ERR_NETWORK") {
        errorMessage = "Cannot connect to server. Make sure the development server is running.";
      } else if (axiosError?.response?.status && axiosError.response.status >= 500) {
        errorMessage = "Server error. Check your MongoDB connection and try seeding the database.";
      }
      
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setUsername("superadmin");
    setPassword("admin123");
  };

  const handleSeed = async () => {
    setSeedMessage(null);
    setSeeding(true);
    try {
      const response = await axios.post("/api/auth/seed");
      const message = response.data?.message || "Database seeded successfully!";
      setSeedMessage(`✅ ${message} You can now login with superadmin/admin123`);
      setUsername("superadmin");
      setPassword("admin123");
      setError(null); // Clear any previous errors
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string; hint?: string; message?: string } }; code?: string };
      const errorData = axiosError?.response?.data;
      let errorMsg = "Failed to seed database.";
      
      if (errorData?.hint) {
        errorMsg = `${errorData.error || errorMsg}\n\n💡 ${errorData.hint}`;
      } else if (errorData?.message) {
        errorMsg = errorData.message;
      } else if (axiosError?.code === "ERR_NETWORK") {
        errorMsg = "Cannot connect to server. Make sure the development server is running (npm run dev).";
      }
      
      setSeedMessage(`❌ ${errorMsg}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#1C274A,_transparent_60%)] px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-2xl border border-gold/30 bg-[#111b33]/80 p-6 backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-gold/20 p-3 text-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gold">Smart Police Analytics</h1>
              <p className="text-xs text-slate-400">Demo credentials available below</p>
            </div>
          </div>
          <div className="rounded-xl border border-gold/20 bg-gold/10 p-4 text-sm text-slate-200 space-y-3">
            <div>
              <p className="font-semibold text-gold mb-2">Demo Account</p>
              <p>
                Username: <span className="font-mono text-gold">superadmin</span>
              </p>
              <p>
                Password: <span className="font-mono text-gold">admin123</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" type="button" onClick={fillDemo}>
                Fill Credentials
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1" 
                type="button" 
                onClick={handleSeed}
                disabled={seeding}
              >
                {seeding ? "Seeding..." : "Seed DB"}
              </Button>
            </div>
            {seedMessage && (
              <div className={`text-xs p-3 rounded whitespace-pre-line ${seedMessage.startsWith("✅") ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
                {seedMessage}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-[#111b33]/90 p-6 backdrop-blur">
          <div>
            <label className="mb-2 block text-sm text-slate-400">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Password</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" type="password" required />
          </div>
          {error && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-center text-xs text-slate-500">
            Need help?{" "}
            <Link href="/" className="text-gold hover:underline">
              Contact Admin
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}


