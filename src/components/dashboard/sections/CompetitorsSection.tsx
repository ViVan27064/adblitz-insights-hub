
import { useDashboard } from "@/contexts/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CompetitorsSection = () => {
  const { competitorData, swotData } = useDashboard();

  // Transform data for the bar chart
  const chartData = competitorData.map((item) => ({
    name: item.keyword,
    "Our Clicks": item.ourClicks,
    "Competitor Clicks": item.competitorClicks,
  }));

  return (
    <div className="section-animation">
      <h2 className="text-2xl font-bold mb-4">Competitor Analysis</h2>
      <p className="text-muted-foreground mb-6">
        Compare your campaign performance with competitors
      </p>

      <Card className="card-hover mb-6">
        <CardHeader>
          <CardTitle>Comparative Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="text-right">Our Clicks</TableHead>
                  <TableHead>Competitor</TableHead>
                  <TableHead className="text-right">Their Clicks</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitorData.map((item, i) => {
                  const performance = (item.ourClicks / item.competitorClicks) * 100 - 100;
                  const isPositive = performance > 0;

                  return (
                    <TableRow key={i} className="hover-scale">
                      <TableCell className="font-medium">{item.keyword}</TableCell>
                      <TableCell className="text-right">{item.ourClicks.toLocaleString()}</TableCell>
                      <TableCell>{item.competitorName}</TableCell>
                      <TableCell className="text-right">{item.competitorClicks.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={isPositive ? "default" : "destructive"} className={isPositive ? "bg-green-500" : ""}>
                          {isPositive ? "+" : ""}{Math.abs(performance).toFixed(0)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Our Clicks" fill="#22c55e" />
                <Bar dataKey="Competitor Clicks" fill="#39A2DB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>SWOT Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="font-bold text-green-800 mb-2">Strengths</h3>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                {swotData.strengths.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-md">
              <h3 className="font-bold text-red-800 mb-2">Weaknesses</h3>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                {swotData.weaknesses.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-bold text-blue-800 mb-2">Opportunities</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                {swotData.opportunities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md">
              <h3 className="font-bold text-yellow-800 mb-2">Threats</h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                {swotData.threats.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorsSection;
