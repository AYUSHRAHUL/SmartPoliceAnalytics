"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Shield, TrendingUp, BarChart3, Award, Users, FileText, Zap, CheckCircle, Star, Activity, Target } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Odisha Police Logo Component
function OdishaPoliceLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Odisha Police Shield Logo */}
      <div className="relative">
        <div className="w-12 h-14 bg-gradient-to-b from-[#FF6B35] to-[#F7931E] rounded-t-lg flex items-center justify-center shadow-lg border-2 border-[#1a1a1a]">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#FF6B35]" />
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#1a1a1a]"></div>
      </div>
      <div>
        <div className="text-xs font-bold text-[#FF6B35] leading-tight">ODISHA</div>
        <div className="text-xs font-bold text-[#1a1a1a] leading-tight">POLICE</div>
      </div>
    </div>
  );
}

// Image Carousel Component
function HeroImageCarousel() {
  const images = [
    {
      id: 1,
      title: "Real-Time Analytics Dashboard",
      description: "Monitor performance metrics across all districts",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "District-Wise Performance",
      description: "Track performance across 30 Odisha districts",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Special Drives Tracking",
      description: "Comprehensive tracking of all special operations",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "AI-Powered Insights",
      description: "Get intelligent predictions and recommendations",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center p-8`}>
            <div className="text-center text-white">
              <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
              <p className="text-white/90">{image.description}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      

      {/* Navigation */}
      <nav className="w-full border-b border-blue-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            {/* Odisha Police Logo */}
            <OdishaPoliceLogo />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/login" 
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-5 py-2.5 text-sm text-blue-700 font-semibold border border-blue-200 shadow-sm">
              <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
              <span>Powered by AI Analytics</span>
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Smart Analytics Dashboard
                </span>
                <span className="block text-gray-800 mt-2">
                  for Police Excellence
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-xl text-gray-600 leading-relaxed font-medium">
                Automatically track, measure, and visualize police officers&apos; performance using 
                <span className="text-blue-600 font-semibold"> data-driven insights</span>, 
                <span className="text-blue-600 font-semibold"> real-time leaderboards</span>, and 
                <span className="text-blue-600 font-semibold"> AI-powered recognition</span> workflows.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all hover:scale-105 shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 hover:border-blue-400 transition-all shadow-lg hover:shadow-xl"
              >
                <Shield className="h-5 w-5" />
                <span>Try Demo</span>
              </Link>
            </div>
            
            {/* Demo Account Card */}
            <div className="pt-4">
              <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Demo Account Available</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-blue-200"></div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-medium">Username:</span>
                    <code className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-mono font-bold text-sm border border-blue-200">
                      superadmin
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-medium">Password:</span>
                    <code className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-mono font-bold text-sm border border-blue-200">
                      admin123
                    </code>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free Trial Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px]">
            <HeroImageCarousel />
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive <span className="text-blue-600">Analytics Dashboard</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time insights, beautiful visualizations, and comprehensive performance tracking
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden mb-12">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Performance Analytics</h3>
                  <p className="text-blue-100 text-sm">Real-time officer performance tracking</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Live</span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <span className="text-xs text-green-600 font-semibold">+12%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">127</div>
                  <div className="text-sm text-gray-600">Active Officers</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center justify-between mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-xs text-green-600 font-semibold">+18%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">4.8k</div>
                  <div className="text-sm text-gray-600">Cases Closed</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <span className="text-xs text-green-600 font-semibold">+5.2%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">72.4</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <Award className="w-8 h-8 text-amber-600" />
                    <span className="text-xs text-green-600 font-semibold">+8%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>

              {/* Performance Trend Chart */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Performance Trend (Last 6 Months)
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={[
                    { month: "May", score: 58, cases: 3200 },
                    { month: "Jun", score: 62, cases: 3500 },
                    { month: "Jul", score: 65, cases: 3800 },
                    { month: "Aug", score: 68, cases: 4000 },
                    { month: "Sep", score: 71, cases: 4200 },
                    { month: "Oct", score: 74, cases: 4500 }
                  ]}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#fff", 
                        border: "1px solid #E5E7EB", 
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row */}
            <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department Contribution */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Department Contribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { name: "Cyber", value: 1250 },
                    { name: "Crime", value: 980 },
                    { name: "Traffic", value: 750 },
                    { name: "Special", value: 620 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#fff", 
                        border: "1px solid #E5E7EB", 
                        borderRadius: "8px"
                      }} 
                    />
                    <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* KPI Distribution */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">KPI Weight Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Cases", value: 40, color: "#3B82F6" },
                        { name: "Cyber", value: 30, color: "#10B981" },
                        { name: "Feedback", value: 20, color: "#F59E0B" },
                        { name: "Awareness", value: 10, color: "#8B5CF6" }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Cases", value: 40, color: "#3B82F6" },
                        { name: "Cyber", value: 30, color: "#10B981" },
                        { name: "Feedback", value: 20, color: "#F59E0B" },
                        { name: "Awareness", value: 10, color: "#8B5CF6" }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#fff", 
                        border: "1px solid #E5E7EB", 
                        borderRadius: "8px"
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Performers */}
              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Top Performers
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Officer A0", dept: "Cyber Cell", score: 94.5, badge: "🥇" },
                    { name: "Officer B1", dept: "Crime Branch", score: 89.2, badge: "🥈" },
                    { name: "Officer C2", dept: "Traffic", score: 85.8, badge: "🥉" },
                    { name: "Officer D3", dept: "Special Task", score: 82.4, badge: "4" }
                  ].map((officer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{officer.badge}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{officer.name}</div>
                          <div className="text-xs text-gray-600">{officer.dept}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{officer.score}</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-blue-100 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Real-Time Analytics</h3>
              <p className="text-gray-600 text-sm">Live data updates and instant insights</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-blue-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Performance Recognition</h3>
              <p className="text-gray-600 text-sm">Automated badges and awards system</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-blue-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Export Reports</h3>
              <p className="text-gray-600 text-sm">PDF & Excel reports in one click</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">127+</div>
              <div className="text-gray-600 font-medium">Active Officers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">4.8k</div>
              <div className="text-gray-600 font-medium">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for <span className="text-blue-600">Modern Policing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to recognize excellence and drive performance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
              <BarChart3 className="w-7 h-7 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Rankings</h3>
            <p className="text-gray-600 leading-relaxed">
              Live leaderboards across crime, cyber, and engagement KPIs with instant updates.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
              <TrendingUp className="w-7 h-7 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Scoring</h3>
            <p className="text-gray-600 leading-relaxed">
              Weighted ML-based scoring and trend analysis for data-driven recognition.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
              <FileText className="w-7 h-7 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Auto Reports</h3>
            <p className="text-gray-600 leading-relaxed">
              One-click PDF/Excel exports for reviews, awards, and promotions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
              <Shield className="w-7 h-7 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
            <p className="text-gray-600 leading-relaxed">
              JWT auth, encrypted data, role-based access, and comprehensive audit logs.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, automated, and transparent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-blue-100 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Integration</h3>
              <p className="text-gray-600">
                Automatically syncs data from CCTNS, ICJS, and Cyber Crime Portal daily
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-blue-100 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Python microservice processes data and calculates weighted performance scores
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-blue-100 text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recognition</h3>
              <p className="text-gray-600">
                Top performers get badges, reports, and transparent recognition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the power of data-driven police recognition. Try our demo or explore the platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 bg-blue-700 text-white border-2 border-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Police Analytics</span>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Team Innosphere • All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


