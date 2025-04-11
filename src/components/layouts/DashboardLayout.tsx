
import { ReactNode } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatbotBubble from "@/components/dashboard/ChatbotBubble";
import Footer from "@/components/dashboard/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className="min-h-screen flex flex-col bg-adblitz-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-5">
          <div className="container max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
      <ChatbotBubble />
    </div>
  );
};

export default DashboardLayout;
