import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Trophy, Target, Star, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import SEOHead from "@/components/SEOHead";

const levelNames = ["Beginner", "Consistent", "Focused", "Master"];
const levelThresholds = [0, 100, 300, 600];

const dailyGoals = [
  { text: "Mark today's attendance", key: "attendance", points: 10 },
  { text: "Use a finance calculator (EMI/SIP/FD)", key: "finance", points: 15 },
  { text: "Log a daily expense", key: "expense", points: 10 },
  { text: "Read one blog article", key: "blog", points: 10 },
  { text: "Use at least one tool", key: "tool", points: 15 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const today = new Date().toDateString();

  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const [lastVisit, setLastVisit] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tml_dashboard");
    if (saved) {
      const data = JSON.parse(saved);
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (data.lastVisit === today) {
        setStreak(data.streak || 0);
        setPoints(data.points || 0);
        setCompletedGoals(data.completedGoals || []);
      } else if (data.lastVisit === yesterday) {
        setStreak((data.streak || 0) + 1);
        setPoints(data.points || 0);
        setCompletedGoals([]);
      } else {
        setStreak(1);
        setPoints(data.points || 0);
        setCompletedGoals([]);
      }
      setLastVisit(data.lastVisit || "");
    } else {
      setStreak(1);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tml_dashboard", JSON.stringify({
      streak, points, completedGoals, lastVisit: today,
    }));
  }, [streak, points, completedGoals]);

  const toggleGoal = (key: string, pts: number) => {
    if (completedGoals.includes(key)) {
      setCompletedGoals(prev => prev.filter(k => k !== key));
      setPoints(p => p - pts);
    } else {
      setCompletedGoals(prev => [...prev, key]);
      setPoints(p => p + pts);
    }
  };

  const level = useMemo(() => {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      if (points >= levelThresholds[i]) return i;
    }
    return 0;
  }, [points]);

  const nextLevelPts = level < levelThresholds.length - 1 ? levelThresholds[level + 1] : levelThresholds[level];
  const levelProgress = level < levelThresholds.length - 1
    ? Math.round(((points - levelThresholds[level]) / (nextLevelPts - levelThresholds[level])) * 100)
    : 100;

  const completionPct = Math.round((completedGoals.length / dailyGoals.length) * 100);

  const quickLinks = [
    { label: "💳 EMI", to: "/emi-calculator" },
    { label: "📈 SIP", to: "/sip-calculator" },
    { label: "💰 Salary", to: "/salary-calculator" },
    { label: "🏦 FD", to: "/fd-calculator" },
    { label: "🧮 GST", to: "/gst-calculator" },
    { label: "❤️ BMI", to: "/bmi-calculator" },
  ];

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead title="Dashboard - Online Calculators" description="Your personal insights dashboard with streaks, points, and daily goals." path="/dashboard" />

      <div>
        <h1 className="tool-title">📊 Your Dashboard</h1>
        <p className="sr-only">Personal insights, streaks & daily goals</p>
      </div>

      {/* Streak & Points */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-warning/20 to-warning/5 rounded-2xl p-5 text-center border border-warning/30">
          <Flame size={28} className="text-warning mx-auto mb-2" />
          <p className="text-[34px] font-extrabold text-foreground">{streak}</p>
          <p className="text-[14px] font-semibold text-muted-foreground">Day Streak 🔥</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-5 text-center border border-primary/30">
          <Trophy size={28} className="text-primary mx-auto mb-2" />
          <p className="text-[34px] font-extrabold text-foreground">{points}</p>
          <p className="text-[14px] font-semibold text-muted-foreground">Total Points</p>
        </motion.div>
      </div>

      {/* Level */}
      <div className="guide-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-warning" />
            <span className="text-[16px] font-bold text-foreground">{levelNames[level]}</span>
          </div>
          <span className="text-[14px] font-semibold text-primary">{points}/{nextLevelPts} pts</span>
        </div>
        <Progress value={levelProgress} className="h-3" />
        {level < levelNames.length - 1 && (
          <p className="text-[13px] text-muted-foreground mt-2">{nextLevelPts - points} points to reach {levelNames[level + 1]}</p>
        )}
      </div>

      {/* Daily Goals */}
      <div className="guide-card space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
            <Target size={18} className="text-primary" /> Today's Goals
          </p>
          <span className={`text-[14px] font-bold ${completionPct === 100 ? "text-safe" : "text-muted-foreground"}`}>
            {completionPct}%
          </span>
        </div>
        <Progress value={completionPct} className="h-2" />
        <div className="space-y-2">
          {dailyGoals.map(goal => {
            const done = completedGoals.includes(goal.key);
            return (
              <motion.button key={goal.key} whileTap={{ scale: 0.98 }} onClick={() => toggleGoal(goal.key, goal.points)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                  done ? "bg-safe/10 border border-safe/30" : "bg-secondary/50 hover:bg-secondary/80"
                }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? "bg-safe text-safe-foreground" : "bg-border"
                }`}>
                  {done && <span className="text-[12px]">✓</span>}
                </div>
                <span className={`flex-1 text-[14px] font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {goal.text}
                </span>
                <span className="text-[12px] font-bold text-primary">+{goal.points}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <div className="guide-card">
        <p className="text-[15px] font-semibold text-foreground">
          {completionPct === 100 ? "🎉 All goals complete today! Amazing work!" :
           completionPct >= 60 ? "🔥 Great progress today — keep pushing!" :
           streak > 3 ? `⚡ ${streak}-day streak! Don't break it now.` :
           "🚀 Complete goals to earn points and level up!"}
        </p>
      </div>

      {/* Quick Links */}
      <div className="guide-card space-y-2">
        <p className="text-[16px] font-bold text-foreground mb-2">⚡ Quick Access</p>
        <div className="grid grid-cols-3 gap-2">
          {quickLinks.map(link => (
            <button key={link.to} onClick={() => navigate(link.to)}
              className="py-3 rounded-xl bg-secondary text-[13px] font-bold text-foreground hover:bg-secondary/80 transition-all">
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
