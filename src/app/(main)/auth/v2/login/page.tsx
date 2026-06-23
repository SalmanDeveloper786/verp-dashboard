"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("admin@verp.com");
  const [password, setPassword] = useState("admin123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a brief network delay for UX purposes, then redirect to the dashboard
    setTimeout(() => {
      router.push("/dashboard/verp");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      
      {/* Background ambient blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:shadow-none mb-6 border border-slate-100 dark:border-slate-800">
            <Command className="size-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm">
            Sign in to your account to continue to the ERP Dashboard.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl shadow-slate-200/20 dark:shadow-none">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Password</label>
                  <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-12 rounded-xl bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-base font-semibold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-blue-500/20 active:translate-y-[0px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign in
                  <ArrowRight className="ml-2 size-4" />
                </div>
              )}
            </Button>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          By signing in, you agree to our <a href="#" className="underline hover:text-slate-800 dark:hover:text-slate-200">Terms of Service</a> and <a href="#" className="underline hover:text-slate-800 dark:hover:text-slate-200">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
