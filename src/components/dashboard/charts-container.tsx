import { BarChart2Icon, LineChartIcon } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import StatsBarChart from './stats-bar-chart';
import StatsLineChart from './stats-line-chart';

export default function ChartsContainer() {
  return (
    <div className="space-y-3 md:space-y-6">
      <h3 className="text-center">Monthly Applications</h3>
      <Tabs defaultValue="bar-chart" className="flex flex-col">
        <TabsList className="mx-auto grid h-fit w-[min(100%,_300px)] grid-cols-2 p-2">
          <TabsTrigger value="bar-chart">
            <div className="flex items-center gap-1">
              <BarChart2Icon aria-hidden="true" />
              <span>Bar Chart</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="line-chart">
            <div className="flex items-center gap-1">
              <LineChartIcon aria-hidden="true" />
              <span>Line Chart</span>
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
