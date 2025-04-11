
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TargetingSection = () => {
  const { targetingData } = useDashboard();

  const getPotentialColor = (potential: number) => {
    if (potential >= 80) return "text-green-600";
    if (potential >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="section-animation">
      <h2 className="text-2xl font-bold mb-4">AI-Powered Targeting</h2>
      <p className="text-muted-foreground mb-6">
        Smart audience recommendations based on your campaign goals
      </p>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Target Audience Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Demographic</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Potential</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {targetingData.map((item) => (
                  <TableRow key={item.id} className="hover-scale">
                    <TableCell className="font-medium">{item.demographic}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-adblitz-lightblue/10 hover:bg-adblitz-lightblue/20">
                        {item.interest}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.potential} className="h-2" />
                        <span className={`text-sm font-medium ${getPotentialColor(item.potential)}`}>
                          {item.potential}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-adblitz-blue hover:text-adblitz-lightblue font-medium text-sm">
                        Apply to Campaign
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Demographics Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>18-24</span>
                      <span>38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>25-34</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>35-44</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>45+</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Gender Distribution</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Male</span>
                      <span>55%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Female</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Location Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">City Tier Distribution</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Tier 1</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Tier 2</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Tier 3</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Top Cities</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Mumbai</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Delhi</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Bengaluru</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TargetingSection;
