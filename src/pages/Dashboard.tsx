
import { useEffect } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TrendsSection from "@/components/dashboard/sections/TrendsSection";
import TrackingSection from "@/components/dashboard/sections/TrackingSection";
import TargetingSection from "@/components/dashboard/sections/TargetingSection";
import CompetitorsSection from "@/components/dashboard/sections/CompetitorsSection";
import BudgetSection from "@/components/dashboard/sections/BudgetSection";
import CampaignFormSection from "@/components/dashboard/sections/CampaignFormSection";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { activeSection } = useDashboard();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to AdBlitz!",
      description: "Explore your analytics dashboard to gain insights.",
    });
  }, [toast]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "trends":
        return <TrendsSection />;
      case "tracking":
        return <TrackingSection />;
      case "targeting":
        return <TargetingSection />;
      case "competitors":
        return <CompetitorsSection />;
      case "budget":
        return <BudgetSection />;
      case "campaign":
        return <CampaignFormSection />;
      default:
        return <TrendsSection />;
    }
  };

  return <DashboardLayout>{renderActiveSection()}</DashboardLayout>;
};

export default Dashboard;
