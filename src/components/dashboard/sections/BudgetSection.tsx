
import { useDashboard } from "@/contexts/DashboardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LightbulbIcon } from "lucide-react";

const BudgetSection = () => {
  const { budgetData } = useDashboard();
  const COLORS = ["#22c55e", "#39A2DB", "#0a2463", "#9333ea"];

  return (
    <div className="section-animation">
      <h2 className="text-2xl font-bold mb-4">Budget Allocation</h2>
      <p className="text-muted-foreground mb-6">
        Optimize your ad spending with intelligent budget distribution
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Current Allocation</CardTitle>
            <CardDescription>How your budget is currently distributed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData.allocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    nameKey="category"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetData.allocation.map((entry, index) => (
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
            <CardTitle>Spend Metrics</CardTitle>
            <CardDescription>Key performance indicators for your budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Cost Per Click</p>
                  <p className="text-2xl font-bold">$0.42</p>
                  <p className="text-xs text-green-600">▼ 8% from last month</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Cost Per Conversion</p>
                  <p className="text-2xl font-bold">$4.87</p>
                  <p className="text-xs text-green-600">▼ 12% from last month</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Monthly Budget</p>
                  <p className="text-2xl font-bold">$8,500</p>
                  <p className="text-xs text-blue-600">70% utilized</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="text-2xl font-bold">238%</p>
                  <p className="text-xs text-green-600">▲ 18% from last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Budget Optimization Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions to improve ROI</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {budgetData.suggestions.map((suggestion, index) => (
              <li key={index} className="bg-adblitz-lightblue/10 p-4 rounded-md flex">
                <LightbulbIcon className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-800">{suggestion}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetSection;
