
import { useDashboard } from "@/contexts/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrendsSection = () => {
  const { trendData } = useDashboard();

  // Group trends by platform
  const platformData = {
    Instagram: trendData.filter((trend) => trend.platform === "Instagram"),
    Twitter: trendData.filter((trend) => trend.platform === "Twitter"),
    LinkedIn: trendData.filter((trend) => trend.platform === "LinkedIn"),
    Facebook: trendData.filter((trend) => trend.platform === "Facebook"),
  };

  const getSize = (count: number) => {
    // Min and max font sizes
    const min = 14;
    const max = 32;
    
    // Max count in the dataset
    const maxCount = Math.max(...trendData.map(t => t.count));
    
    // Calculate size based on count relative to max count
    const size = min + ((count / maxCount) * (max - min));
    return `${size}px`;
  };

  const getColor = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return "text-purple-600";
      case "Twitter":
        return "text-blue-500";
      case "LinkedIn":
        return "text-blue-700";
      case "Facebook":
        return "text-blue-600";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="section-animation">
      <h2 className="text-2xl font-bold mb-4">Trending Keywords</h2>
      <p className="text-muted-foreground mb-6">
        Monitor real-time trending keywords across social platforms
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Word Cloud</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="h-64 flex items-center justify-center">
              <div className="flex flex-wrap gap-4 justify-center">
                {trendData.map((trend) => (
                  <div 
                    key={trend.keyword}
                    className={`${getColor(trend.platform)} hover-scale cursor-pointer`}
                    style={{ fontSize: getSize(trend.count) }}
                    title={`${trend.keyword}: ${trend.count} mentions on ${trend.platform}`}
                  >
                    {trend.keyword}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {Object.entries(platformData).map(([platform, trends]) => (
              <TabsContent key={platform} value={platform.toLowerCase()} className="h-64 flex items-center justify-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  {trends.map((trend) => (
                    <div 
                      key={`${platform}-${trend.keyword}`}
                      className={`${getColor(platform)} hover-scale cursor-pointer`}
                      style={{ fontSize: getSize(trend.count) }}
                      title={`${trend.keyword}: ${trend.count} mentions on ${platform}`}
                    >
                      {trend.keyword}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsSection;
