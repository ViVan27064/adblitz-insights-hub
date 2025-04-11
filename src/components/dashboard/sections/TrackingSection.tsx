
import { useDashboard } from "@/contexts/DashboardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const TrackingSection = () => {
  const { trackingData } = useDashboard();
  const COLORS = ["#22c55e", "#39A2DB", "#EF4444"];

  return (
    <div className="section-animation">
      <h2 className="text-2xl font-bold mb-4">Campaign Tracking</h2>
      <p className="text-muted-foreground mb-6">
        Monitor your campaign performance metrics and get AI-powered insights
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>ROI Distribution</CardTitle>
            <CardDescription>Return on investment by campaign</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={trackingData.roi}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="label"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {trackingData.roi.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Click Performance</CardTitle>
            <CardDescription>
              Ad clicks over the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={trackingData.clicks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#39A2DB"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Clicks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>AI Suggestions</CardTitle>
          <CardDescription>
            Smart recommendations to boost your campaign performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {trackingData.suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={`p-3 rounded-md ${
                  suggestion.type === "positive"
                    ? "bg-green-50 border-l-4 border-green-500"
                    : "bg-red-50 border-l-4 border-red-500"
                }`}
              >
                <p
                  className={`${
                    suggestion.type === "positive"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {suggestion.text}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingSection;
