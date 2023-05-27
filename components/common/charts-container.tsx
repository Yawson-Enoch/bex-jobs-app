import { BarChart2Icon, LineChartIcon } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import StatsBarChart from './stats-bar-chart';
import StatsLineChart from './stats-line-chart';

export default function ChartsContainer() {
  return (
    <div className="space-y-2 md:space-y-4">
      <p className="text-center text-2xl font-medium">Monthly Applications</p>
      <Tabs defaultValue="bar-chart" className="flex flex-col">
        <TabsList className="w-fit mx-auto p-2 h-fit">
          <TabsTrigger value="bar-chart">
            <div className="flex gap-1 items-center">
              <BarChart2Icon />
              <p>Bar Chart</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="line-chart">
            <div className="flex gap-1 items-center">
              <LineChartIcon />
              <p>Line Chart</p>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bar-chart">
          <StatsBarChart />
        </TabsContent>
        <TabsContent value="line-chart">
          <StatsLineChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
