
import { createContext, useContext, useState, ReactNode } from "react";
import {
  TrendData,
  TrackingData,
  TargetingData,
  CompetitorData,
  SWOTData,
  BudgetData,
  CampaignFormData,
} from "../types";

// Mock data
const mockTrendData: TrendData[] = [
  { keyword: "#Fitness", count: 120, platform: "Instagram" },
  { keyword: "#HealthyEating", count: 95, platform: "Twitter" },
  { keyword: "#Workout", count: 80, platform: "Instagram" },
  { keyword: "#Nutrition", count: 75, platform: "Facebook" },
  { keyword: "#WellnessWednesday", count: 70, platform: "Twitter" },
  { keyword: "#GymLife", count: 65, platform: "Instagram" },
  { keyword: "#OrganicFood", count: 60, platform: "LinkedIn" },
  { keyword: "#MindfulLiving", count: 55, platform: "Facebook" },
  { keyword: "#SustainableLiving", count: 50, platform: "LinkedIn" },
  { keyword: "#EcoFriendly", count: 45, platform: "Facebook" },
];

const mockTrackingData: TrackingData = {
  roi: [
    { label: "#Fitness", value: 60 },
    { label: "#HealthyEating", value: 40 },
  ],
  clicks: [
    { date: "Mon", value: 120 },
    { date: "Tue", value: 180 },
    { date: "Wed", value: 150 },
    { date: "Thu", value: 200 },
    { date: "Fri", value: 250 },
    { date: "Sat", value: 180 },
    { date: "Sun", value: 220 },
  ],
  suggestions: [
    { text: "Increase #Fitness budget", type: "positive" },
    { text: "Remove #OldTrend ads", type: "negative" },
    { text: "Optimize targeting for mobile", type: "positive" },
  ],
};

const mockTargetingData: TargetingData[] = [
  {
    id: 1,
    demographic: "18-25 males",
    location: "Tier-2 cities like Jaipur",
    interest: "Fitness",
    potential: 85,
  },
  {
    id: 2,
    demographic: "25-35 females",
    location: "Tier-3 cities like Kanpur",
    interest: "Eco-products",
    potential: 78,
  },
  {
    id: 3,
    demographic: "30-45 males",
    location: "Metro cities",
    interest: "Healthy Eating",
    potential: 76,
  },
  {
    id: 4,
    demographic: "18-30 females",
    location: "Tier-1 cities",
    interest: "Sustainable Products",
    potential: 72,
  },
];

const mockCompetitorData: CompetitorData[] = [
  {
    keyword: "#Fitness",
    ourClicks: 500,
    competitorName: "#GymLife",
    competitorClicks: 300,
  },
  {
    keyword: "#HealthyEating",
    ourClicks: 400,
    competitorName: "#HealthyFood",
    competitorClicks: 450,
  },
  {
    keyword: "#Nutrition",
    ourClicks: 350,
    competitorName: "#Diet",
    competitorClicks: 320,
  },
];

const mockSWOTData: SWOTData = {
  strengths: ["High ROI", "Strong Instagram presence", "Engaging ad content"],
  weaknesses: ["Low LinkedIn reach", "Limited video content", "Narrow audience"],
  opportunities: ["Target Tier-3 cities", "Expand to eco-friendly products", "Leverage emerging hashtags"],
  threats: ["Competitor budget increase", "Platform algorithm changes", "Market saturation"],
};

const mockBudgetData: BudgetData = {
  allocation: [
    { category: "#Fitness ads", value: 50 },
    { category: "#EcoFriendly ads", value: 30 },
    { category: "LinkedIn ads", value: 20 },
  ],
  suggestions: [
    "Allocate more to #EcoFriendly ads for higher ROI",
    "Reduce LinkedIn spending by 5%",
    "Test new ad variations for #Fitness campaign",
  ],
};

interface DashboardContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  trendData: TrendData[];
  trackingData: TrackingData;
  targetingData: TargetingData[];
  competitorData: CompetitorData[];
  swotData: SWOTData;
  budgetData: BudgetData;
  campaignFormData: CampaignFormData;
  setCampaignFormData: (data: CampaignFormData) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
}

const initialCampaignFormData: CampaignFormData = {
  platform: "",
  adType: "",
  budget: 0,
  audience: {
    age: [],
    location: [],
    interest: [],
  },
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("trends");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [campaignFormData, setCampaignFormData] = useState<CampaignFormData>(initialCampaignFormData);

  return (
    <DashboardContext.Provider
      value={{
        activeSection,
        setActiveSection,
        trendData: mockTrendData,
        trackingData: mockTrackingData,
        targetingData: mockTargetingData,
        competitorData: mockCompetitorData,
        swotData: mockSWOTData,
        budgetData: mockBudgetData,
        campaignFormData,
        setCampaignFormData,
        sidebarOpen,
        setSidebarOpen,
        chatbotOpen,
        setChatbotOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
