
import { useDashboard } from "@/contexts/DashboardContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hash, BarChart, User, ChartLine, Wallet, PanelLeft } from "lucide-react";

const Sidebar = () => {
  const { activeSection, setActiveSection, sidebarOpen, setSidebarOpen } = useDashboard();

  const menuItems = [
    {
      id: "trends",
      name: "Trends",
      icon: <Hash className="h-5 w-5" />,
    },
    {
      id: "tracking",
      name: "Tracking",
      icon: <ChartLine className="h-5 w-5" />,
    },
    {
      id: "targeting",
      name: "Targeting",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: "competitors",
      name: "Competitors",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      id: "budget",
      name: "Budget",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      id: "campaign",
      name: "Campaign Setup",
      icon: <PanelLeft className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-white transition-transform duration-300 md:relative",
        sidebarOpen ? "translate-x-0 w-56 md:w-64" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mt-10 md:mt-0">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full justify-start text-left mb-1 hover-scale",
                activeSection === item.id
                  ? "bg-adblitz-lightblue text-white hover:bg-adblitz-lightblue/90 hover:text-white"
                  : "hover:bg-adblitz-lightblue/10"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Collapse" : ""}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
